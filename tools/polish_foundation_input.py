from pathlib import Path
root=Path(__file__).resolve().parents[1]/'.release-lithuanian-art'
file=root/'foundation-practice.js';text=file.read_text(encoding='utf8')
assert 'dialog.append(form);' in text
file.write_text(text.replace('dialog.append(form);','dialog.append(form,ui.letters(field));'),encoding='utf8')
