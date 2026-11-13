"""Add phrase-word meanings: python add_words.py <json file of {word: meaning}>"""
import json, sys
p = 'a2-units-words.json'; d = json.load(open(p, encoding='utf-8'))
d.update(json.load(open(sys.argv[1], encoding='utf-8')))
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False); print('ok', len(d))
