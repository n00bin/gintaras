#!/usr/bin/env bash
# Adds the one-off "Save the old backup tables" job to the private n00bin/wordami-backups repo and starts it.
# The run fails safely (nothing saved, nothing changed) until the backup login may read the old tables.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
git clone -q https://github.com/n00bin/wordami-backups.git "$TMP/wb"
[ "$(gh api repos/n00bin/wordami-backups --jq .private)" = "true" ] || { echo "Stopped: the backups repo is not private."; exit 1; }
cp "$HERE/archive-old-tables.yml" "$TMP/wb/.github/workflows/archive-old-tables.yml"
cd "$TMP/wb"
if git diff --quiet && git diff --cached --quiet && git ls-files --error-unmatch .github/workflows/archive-old-tables.yml >/dev/null 2>&1; then
  echo "The job is already there."
else
  git add .github/workflows/archive-old-tables.yml
  git commit -q -m "Add one-off job to save the old in-database backup tables for 30 days"
  git push -q origin HEAD
  echo "Job added to the private backups repo."
fi
rm -rf "$TMP"
