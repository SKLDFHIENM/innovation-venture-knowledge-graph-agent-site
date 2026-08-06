import re, os
print('Node updater builder ready')
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Loaded index.html ok, length:', len(idx))
print('Appending cases grid and modal logic to index.html...')
