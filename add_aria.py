import os
import re

def add_aria_label(html_content):
    # 1. 寻找 <nav> 并添加 aria-label
    # 区分主导航和侧边栏/目录导航
    # 假设 class="main-nav" 是主导航，其他为侧边栏/目录导航
    
    def nav_repl(match):
        tag = match.group(0)
        if 'aria-label' in tag:
            return tag
        if 'main-nav' in tag or 'id="mainNav"' in tag or 'id="main-nav"' in tag:
            return tag.replace('<nav', '<nav aria-label="主导航"')
        else:
            # 默认为侧边栏导航或页面目录
            if 'toc' in tag.lower() or 'catalog' in tag.lower():
                return tag.replace('<nav', '<nav aria-label="页面目录"')
            return tag.replace('<nav', '<nav aria-label="侧边栏导航"')

    html_content = re.sub(r'<nav\b[^>]*>', nav_repl, html_content)

    # 2. 寻找按钮并添加 aria-label
    # 我们用一个通用的函数处理 button 和 a 标签
    def btn_repl(match):
        tag = match.group(0)
        if 'aria-label' in tag:
            return tag
            
        # 检查是否包含特定的类名或 id
        if re.search(r'class="[^"]*?(theme-toggle|moon|sun)[^"]*"|id="[^"]*?theme-toggle[^"]*"', tag) or re.search(r'fa-moon|fa-sun', tag):
            return re.sub(r'<(button|a)\b', r'<\1 aria-label="切换深色/浅色主题"', tag)
            
        if re.search(r'class="[^"]*?fullscreen-btn[^"]*"', tag) or re.search(r'fa-expand', tag):
            return re.sub(r'<(button|a)\b', r'<\1 aria-label="切换全屏模式"', tag)
            
        if re.search(r'id="[^"]*?backToTop[^"]*"', tag) or re.search(r'fa-arrow-up', tag):
            return re.sub(r'<(button|a)\b', r'<\1 aria-label="返回顶部"', tag)
            
        if re.search(r'class="[^"]*?close-btn[^"]*"', tag) or re.search(r'fa-times', tag):
            return re.sub(r'<(button|a)\b', r'<\1 aria-label="关闭"', tag)
            
        if re.search(r'fa-search', tag):
            return re.sub(r'<(button|a)\b', r'<\1 aria-label="搜索"', tag)
            
        return tag

    # 匹配 <button ...>...</button> 和 <a ...>...</a>
    # 这样可以检查标签内部是否包含特定的图标类名 (如 <i class="fas fa-search"></i>)
    # 由于匹配整个标签内容可能会跨行，我们使用 re.DOTALL
    
    html_content = re.sub(r'<button\b[^>]*>.*?</button>', btn_repl, html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(r'<a\b[^>]*>.*?</a>', btn_repl, html_content, flags=re.DOTALL | re.IGNORECASE)

    return html_content

if __name__ == '__main__':
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = add_aria_label(content)
        
        if content != new_content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
        else:
            print(f"No changes for {file}")
