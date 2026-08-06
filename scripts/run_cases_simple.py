# -*- coding: utf-8 -*-
import re, json
print('Simple cases script ready')
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Index file size:', len(idx))
print('Appending simple section logic...')
