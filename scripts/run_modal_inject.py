# -*- coding: utf-8 -*-
import re
print('Modal inject script ready')
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Read index.html ok, length:', len(idx))
print('Appending modal injection script logic...')
