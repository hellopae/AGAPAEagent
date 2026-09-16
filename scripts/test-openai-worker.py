import importlib.util
import json
import tempfile
from pathlib import Path
import unittest
from unittest.mock import patch
from types import SimpleNamespace

spec=importlib.util.spec_from_file_location('worker',Path(__file__).with_name('openai-worker.py'))
w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
FIND=w.find_codex  # ตัวจริง ก่อน setUp จะ mock

class WorkerTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.root=Path(self.tmp.name);self.brief=self.root/'brief.md';self.brief.write_text('Inspect only')
        self.argv=['--agent','codex','--task',str(self.brief),'--project',str(self.root)]
        self.patch=patch.object(w,'ROOT',self.root);self.patch.start();self.addCleanup(self.patch.stop)
        codex=patch.object(w,'find_codex',return_value='/bin/codex');codex.start();self.addCleanup(codex.stop)
    def test_plan_does_not_run_or_write(self):
        with patch.object(w.subprocess,'run') as run,patch.object(w,'publish') as pub:
            self.assertEqual(w.main(self.argv),0);run.assert_not_called();pub.assert_not_called()
            self.assertFalse((self.root/'Output').exists())
    def test_success_is_review_pending_no_publish(self):
        def fake(cmd,**kw):
            self.assertIn('--ephemeral',cmd);self.assertIn('read-only',cmd);self.assertNotIn('claude',cmd)
            Path(cmd[cmd.index('--output-last-message')+1]).write_text('Evidence')
            return SimpleNamespace(returncode=0)
        with patch.object(w.subprocess,'run',side_effect=fake),patch.object(w,'publish') as pub:
            self.assertEqual(w.main(self.argv+['--run']),0);pub.assert_not_called()
    def test_publish_lifecycle_has_start_then_review(self):
        states=[]
        def fake(cmd,**kw):
            self.assertEqual(states,['running'])
            Path(cmd[cmd.index('--output-last-message')+1]).write_text('private report')
            return SimpleNamespace(returncode=0)
        with patch.object(w.subprocess,'run',side_effect=fake),patch.object(w,'publish',side_effect=lambda a,s:states.append(s['status'])):
            self.assertEqual(w.main(self.argv+['--run','--publish']),0)
        self.assertEqual(states,['running','ready_for_review'])
    def test_empty_report_is_failure(self):
        with patch.object(w.subprocess,'run',return_value=SimpleNamespace(returncode=0)):
            self.assertEqual(w.main(self.argv+['--run']),1)
    def test_timeout_is_failure(self):
        with patch.object(w.subprocess,'run',side_effect=w.subprocess.TimeoutExpired('codex',600)):
            self.assertEqual(w.main(self.argv+['--run']),1)
    def test_explicit_publish_failure_is_reported(self):
        with patch.object(w.subprocess,'run',return_value=SimpleNamespace(returncode=1)),patch.object(w,'publish',side_effect=OSError) as pub:
            self.assertEqual(w.main(self.argv+['--run','--publish']),1);self.assertEqual(pub.call_args.args[0],'codex')
    def test_publish_target_and_mask_exclude_report(self):
        class Response:
            status=200
            def __enter__(self):return self
            def __exit__(self,*a):pass
        with patch.object(w.urllib.request,'urlopen',return_value=Response()) as call:
            w.publish('astra',{'status':'ready_for_review','run_id':'test'})
            req=call.call_args.args[0]
            self.assertIn('/agents/astra?',req.full_url)
            self.assertIn('updateMask.fieldPaths=status',req.full_url)
            self.assertNotIn('report',req.data.decode())
    def test_codex_binary_path_then_app_then_none(self):
        with patch.object(w.shutil,'which',return_value='/usr/local/bin/codex'):
            self.assertEqual(FIND(),'/usr/local/bin/codex')
        with patch.object(w.shutil,'which',return_value=None),patch.object(w,'APP_CODEX',self.brief):
            self.assertEqual(FIND(),str(self.brief))
        with patch.object(w.shutil,'which',return_value=None),patch.object(w,'APP_CODEX',self.root/'missing'):
            self.assertIsNone(FIND())
    def test_missing_codex_is_clear_error(self):
        with patch.object(w,'find_codex',return_value=None),patch.object(w.subprocess,'run') as run:
            with self.assertRaises(SystemExit):w.main(self.argv+['--run'])
            run.assert_not_called()
    def test_default_model_is_omitted(self):
        self.assertNotIn('--model',w.command('codex',self.root,None,self.root/'r.md'))
        self.assertIn('gpt-x',w.command('codex',self.root,'gpt-x',self.root/'r.md'))
    def test_write_mode_uses_worktree_and_saves_diff(self):
        calls=[]
        def fake_git(*a):
            calls.append(a)
            if '--show-toplevel' in a:return str(self.root)+'\n'
            if a[-1]=='HEAD':return 'abc123\n'
            if '--stat' in a:return ' a.txt | 1 +\n'
            return 'diff --git a/a.txt b/a.txt\n' if 'diff' in a else ''
        def fake(cmd,**kw):
            self.assertEqual(cmd[cmd.index('--sandbox')+1],'workspace-write')
            tree=cmd[cmd.index('-C')+1];self.assertIn('.codex-worktrees',tree);self.assertNotEqual(tree,str(self.root))
            Path(cmd[cmd.index('--output-last-message')+1]).write_text('changed a.txt; self-check done')
            return SimpleNamespace(returncode=0)
        with patch.object(w,'git',side_effect=fake_git),patch.object(w.subprocess,'run',side_effect=fake):
            self.assertEqual(w.main(self.argv+['--run','--write']),0)
        add=[c for c in calls if 'worktree' in c][0]
        self.assertEqual(add[add.index('-b')+1][:6],'codex/');self.assertEqual(add[-1],'abc123')
        self.assertFalse(any('push' in c or 'merge' in c or 'commit' in c for c in calls))
        run=next((self.root/'Output'/'Codex'/'runs').iterdir())
        state=json.loads((run/'status.json').read_text())
        self.assertEqual((state['status'],state['base_commit']),('ready_for_review','abc123'))
        self.assertTrue(state['branch'].startswith('codex/'));self.assertIn('.codex-worktrees',state['worktree'])
        self.assertTrue((run/'diff.patch').read_text());self.assertIn('a.txt',(run/'diff-stat.txt').read_text())
    def test_write_is_codex_only(self):
        with self.assertRaises(SystemExit):w.main(['--agent','astra','--task',str(self.brief),'--project',str(self.root),'--write'])
    def test_rate_limit_is_distinct_from_failed(self):
        def fake(cmd,**kw):
            kw['stderr'].write('ERROR: 429 Too Many Requests: usage limit reached');return SimpleNamespace(returncode=1)
        with patch.object(w.subprocess,'run',side_effect=fake):
            self.assertEqual(w.main(self.argv+['--run']),3)
        run=next((self.root/'Output'/'Codex'/'runs').iterdir())
        self.assertEqual(json.loads((run/'status.json').read_text())['status'],'rate_limited')
    def test_limit_words_in_normal_output_do_not_count(self):
        def fake(cmd,**kw):
            kw['stdout'].write(json.dumps({'type':'agent_message','text':'brief mentions rate limit'})+'\n');return SimpleNamespace(returncode=1)
        with patch.object(w.subprocess,'run',side_effect=fake):
            self.assertEqual(w.main(self.argv+['--run']),1)
if __name__=='__main__':unittest.main()
