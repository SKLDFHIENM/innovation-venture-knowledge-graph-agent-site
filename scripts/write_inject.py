import re, json
print('Write inject ready!')
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Read index.html ok, length:', len(idx))
