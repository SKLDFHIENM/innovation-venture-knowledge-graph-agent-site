import re, json

print('Starting updates for gold award cases...')
with open('resources.html', 'r', encoding='utf-8') as f: res = f.read()
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Loaded resources.html length:', len(res), 'Index length:', len(idx))
