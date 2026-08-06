# -*- coding: utf-8 -*-
import re, json

with open('resources.html', 'r', encoding='utf-8') as f:
    res = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

print('Ready to update resources and index!')
