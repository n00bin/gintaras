#!/usr/bin/env bash
# One-time setup for Wordami's nightly backups. Safe to run again.
# Creates the private repo, makes the encryption password, stores it on the repo, and installs the nightly job.
# The password is never printed. Nothing here touches the live app or the database.
set -euo pipefail

REPO=n00bin/wordami-backups
HERE="$(cd "$(dirname "$0")" && pwd)"
PASSFILE="$HOME/.claude/secrets/wordami_backup_passphrase.txt"

echo "1. Encryption password"
mkdir -p "$(dirname "$PASSFILE")"
if [ -s "$PASSFILE" ]; then
  echo "   Already exists, keeping it."
else
  openssl rand -base64 36 | tr -d '\n' > "$PASSFILE"
  chmod 600 "$PASSFILE"
  echo "   Created."
fi

echo "2. Private repo"
if gh repo view "$REPO" >/dev/null 2>&1; then
  echo "   Already exists."
else
  gh repo create "$REPO" --private --description "Encrypted nightly database backups for Wordami" >/dev/null
  echo "   Created."
fi
if [ "$(gh repo view "$REPO" --json visibility --jq .visibility)" != "PRIVATE" ]; then
  echo "STOPPED: $REPO is not private. Backup details must not go in a public repo." >&2
  exit 1
fi

echo "3. Storing the password on the repo"
gh secret set BACKUP_PASSPHRASE -R "$REPO" < "$PASSFILE"

echo "4. Installing the nightly job"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
gh repo clone "$REPO" "$WORK" -- --quiet 2>/dev/null
cd "$WORK"
git symbolic-ref HEAD refs/heads/main
mkdir -p .github/workflows
cp "$HERE/nightly-backup.yml" .github/workflows/nightly-backup.yml
cp "$HERE/restore-rehearsal.yml" .github/workflows/restore-rehearsal.yml
cp "$HERE/fingerprint.sql" fingerprint.sql
cp "$HERE/RESTORE.md" RESTORE.md
printf '# Wordami backups\n\nEncrypted nightly backups, kept 30 days. They are stored under the Actions tab, not in the code. See RESTORE.md.\n' > README.md
git add -A
if git diff --cached --quiet; then
  echo "   Already up to date."
else
  git commit -q -m "Nightly encrypted database backup" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
  git push -q origin main
  echo "   Installed."
fi

cat <<EOF

Repo ready. Copy the encryption password somewhere safe that isn't this PC, like a password manager.
Without it, the backups can't be opened. It's in this file:
$PASSFILE
EOF
