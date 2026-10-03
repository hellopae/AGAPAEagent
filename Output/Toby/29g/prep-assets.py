"""Run only prep(), never the CLI main/ingest/make-manifest."""
from pathlib import Path
import importlib.util, json, shutil, tempfile, hashlib
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'output/Toby/29g'
spec = importlib.util.spec_from_file_location('prep_art', ROOT / 'scripts/prep-art.py')
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
records = json.loads((OUT / 'generation-records.json').read_text())
with tempfile.TemporaryDirectory() as temp:
    for key, rec in records.items():
        name = f'BG-{key}-asia'
        saved = OUT / 'generated' / f'{name}.png'
        if not saved.exists():
            shutil.copy2(rec['generatedPath'], saved)
        normalized = Path(temp) / f'{name}.png'
        with Image.open(saved) as im:
            print(f'{name}: generated {im.size} -> normalized 1913x1025 (nearest, full image)')
            im.convert('RGB').resize((1913, 1025), Image.Resampling.NEAREST).save(normalized)
        size = mod.prep(str(normalized), name, str(ROOT / 'img/Asia'))
        mod.prep(str(normalized), name, temp)
        dest = ROOT / 'img/Asia' / f'{name}.webp'
        assert dest.read_bytes() == (Path(temp) / f'{name}.webp').read_bytes()
        print(f'prep {size}; reproducible bytes; sha256 {hashlib.sha256(dest.read_bytes()).hexdigest()}')
