"""overlay: python3 -I ov.py <id> [scale] -> work/ov-<id>.png (ground | ground with Codex mask tinted)"""
import sys; sys.path.insert(0, '.')
from fl import *
CX = '/Users/agapae/agapae-work/.toby-worktrees/.codex-worktrees/20261111T162400Z-9a28b146/docs/art-reviews/2026-11-05-z1v7-fluids/'
lay = {p['id'].split('--')[0]: p for p in json.load(open(CX+'fx-layout.json'))['pieces']}
pid = sys.argv[1]; sc = float(sys.argv[2]) if len(sys.argv) > 2 else 1
p = lay[pid]; r = p['maskRectPx']
g = ground(*r); m = Image.open(CX+'masks/'+p['mask']+'.webp').convert('RGBA').split()[3]
if m.size != g.size: m = m.resize(g.size)
a = np.array(g).astype(float); mm = np.array(m)[..., None]/255.
edge = ndi.binary_dilation(mm[..., 0] > .5, iterations=2) & ~ndi.binary_erosion(mm[..., 0] > .5, iterations=1)
b = a.copy(); b[edge] = [255, 0, 255]; b = b*(1-mm*.25)+np.array([0, 255, 0])*mm*.25
out = Image.new('RGB', (g.width*2+10, g.height)); out.paste(g, (0, 0)); out.paste(Image.fromarray(b.astype(np.uint8)), (g.width+10, 0))
if sc != 1: out = out.resize((int(out.width*sc), int(out.height*sc)), Image.LANCZOS)
out.save(WORK+f'ov-{pid}.png'); print(out.size)
