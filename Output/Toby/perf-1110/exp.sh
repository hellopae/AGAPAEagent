#!/bin/bash
# usage: exp.sh label 'json patches' [scenes]
cd "$(dirname "$0")"
PATCHES="$2" python3 run_scenes.py ${PORT:-8950} "$1" "${3:-idle}" 2>&1 | grep "fps"
