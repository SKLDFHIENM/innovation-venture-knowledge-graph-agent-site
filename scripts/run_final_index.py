# -*- coding: utf-8 -*-
import re, json
print('Run final index script ready')
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Read index.html ok, length:', len(idx))
print('Appending final index logic...')
