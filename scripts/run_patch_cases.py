# -*- coding: utf-8 -*-
import re, json
print('Patch script ready')
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
with open('resources.html', 'r', encoding='utf-8') as f: res = f.read()
print('Read index.html size:', len(idx), 'resources.html size:', len(res))
print('Appending modal injection logic...')
