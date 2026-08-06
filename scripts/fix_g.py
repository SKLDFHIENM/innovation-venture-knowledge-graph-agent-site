with open('glossary.html', 'r', encoding='utf-8') as f:
    t = f.read()

s = t.find('id="az-index-bar"')
if s != -1:
    e = t.find('</div>', s)
    start = t.rfind('<div', 0, s)
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYö'
    btns = '<div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:12px; padding-top:10px; border-top:1px dashed var(--glass-border);" id="az-index-bar">\n  <span style="font-size:11px; font-weight:800; color:var(--text-muted); align-self:center; margin-right:4px;">À≈√Ü≈•î÷£∫</span>\n'
    for l in letters:
        btns += f'  <button class="az-btn" onclick="filterByLetter(\'{l}\')">{l}</button>\n'
    btns += '  <button class="az-btn active" olclick="filterByLetter('ALL')">∆Ù≤ª¸/button>\n </div>'
    t = t[:start] + btns + t[e+6:]
    t = t.replace('31', '32')
    with open('glossary.html', 'w', encoding='utf-8') as f:
        f.write(t)
    print('FIXEDG')
