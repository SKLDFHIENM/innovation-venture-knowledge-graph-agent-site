# -*- coding: utf-8 -*-
import re

with open('resources.html', 'r', encoding='utf-8') as f:
    res = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

print('Resources length:', len(res), 'Index length:', len(idx))
