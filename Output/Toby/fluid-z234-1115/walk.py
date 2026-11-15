"""walkmask of a zone as a bool array (320 x 480 cells of 8 world units) read from src/town-owner-walkmask-<zone>.js (read-only)"""
import re, numpy as np, os
REPO = os.path.expanduser('~/agapae-work/.toby-worktrees/z1-v5/')
FILE = {2: 'asia', 3: 'west', 4: 'cyberhell'}
def walk(z):
    s = open(REPO + f'src/town-owner-walkmask-{FILE[z]}.js').read()
    runs = [int(v) for v in re.search(r'TOWN_OWNER_WALK_RUNS=\[([^\]]*)\]', s).group(1).split(',')]
    meta = int(re.search(r'"walkable_cells":(\d+)', s).group(1))
    out = np.zeros(320 * 480, bool); i = 0; val = False
    for r in runs: out[i:i + r] = val; i += r; val = not val
    assert i == 320 * 480, i
    return out.reshape(320, 480), meta
if __name__ == '__main__':
    for z in (2, 3, 4):
        w, m = walk(z); print(z, int(w.sum()), m)
