# -*- coding: utf-8 -*-
import re

# 1. Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

# 2. Read resources.html
with open('resources.html', 'r', encoding='utf-8') as f:
    res_content = f.read()

print('Successfully read index.html and resources.html!')
