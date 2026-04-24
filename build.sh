#!/usr/bin/env bash
# Build script: compile JSX → minified JS, minify CSS, assemble dist/ for deploy.
set -euo pipefail

OUT=dist
rm -rf "$OUT"
mkdir -p "$OUT/components" "$OUT/assets"

# Compile each JSX file individually (classic React.createElement transform, global React).
for f in components/*.jsx; do
  out="$OUT/components/$(basename "${f%.jsx}.js")"
  npx --yes esbuild "$f" --loader:.jsx=jsx --minify --target=es2020 --outfile="$out"
done

# Minify the merged stylesheet.
npx --yes esbuild styles.css --minify --outfile="$OUT/styles.min.css"

# Static files.
cp index.html favicon.svg "$OUT/"
cp -r assets "$OUT/"

echo ""
echo "build complete → $OUT/"
ls -la "$OUT/"
