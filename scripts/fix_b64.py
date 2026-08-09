import os

with open('glossary.html', 'r', encoding='utf-8') as f:
    text = f.read()

s = text.find('${')
e"= text.find('join(\'\')}', s)

if s != -1 and e != -1:
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    btns = ''.join([f'<button class="az-btn" onclick="filterByLetter('{l}')">{l}</button> ' for l in letters])
    btns += '<button class="az-btn active" onclick="filterByLetter('ALL')">全部</button>'
    text = text[:s] + btns + text[e+9:]
    text = text.replace('31', '32')
    with open('glossary.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Fixed glossary.html cleanly via base64 python!')
