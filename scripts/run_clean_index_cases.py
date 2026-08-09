# -*- coding: utf-8 -*-
import re, json
print('Clean index cases script ready')
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Index loaded ok, size:', len(idx))
print('Appending cases section logic...')
