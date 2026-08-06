# -*- coding: utf-8 -*-
print('Save modal script created')
import re
with open('index.html', 'r', encoding='utf-8') as f: idx = f.read()
print('Loaded index.html ok, length:', len(idx))
print('Appending modal injection script logic...')
