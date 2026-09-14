import importlib.util
import tempfile
from pathlib import Path
import unittest
from unittest.mock import patch
from types import SimpleNamespace

spec=importlib.util.spec_from_file_location('worker',Path(__file__).with_name('openai-worker.py'))
w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)

class WorkerTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.root=Path(self.tmp.name);self.brief=self.root/'brief.md';self.brief.write_text('Inspect only')
        self.argv=['--agent','codex','--task',str(self.brief),'--project',str(self.root)]
        self.patch=patch.object(w,'ROOT',self.root);self.patch.start();self.addCleanup(self.patch.stop)
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
if __name__=='__main__':unittest.main()
