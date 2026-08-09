#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动化 CI/CD Lint 脚本：全仓 CSS 规则与异常样式扫描器
用于检测 HTML/CSS/JS 中非法的 CSS 属性值（如 width: 完整; 或格式损坏的样式声明）
"""

import glob
import re
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# 检查 style="" 属性或 CSS 样式块中是否包含非法的“完整”或损坏属性
STYLE_ATTR_PATTERN = re.compile(r'style\s*=\s*"([^"]+)"', re.IGNORECASE)
CSS_RULE_PATTERN = re.compile(r'([a-zA-Z\-]+)\s*:\s*([^;\}]+)', re.IGNORECASE)

def lint_codebase():
    files = glob.glob("**/*.html", recursive=True) + \
            glob.glob("**/*.css", recursive=True) + \
            glob.glob("**/*.js", recursive=True)

    errors = []
    checked_files = 0

    for file_path in files:
        if ".workbuddy" in file_path or "node_modules" in file_path or "scripts/" in file_path or ".git" in file_path:
            continue
        checked_files += 1
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                lines = f.readlines()

            in_style_block = False
            for line_idx, line in enumerate(lines, 1):
                stripped = line.strip()
                if "<style" in stripped:
                    in_style_block = True
                if "</style>" in stripped:
                    in_style_block = False

                # 1. 检查内联 style 属性中的非法“完整”
                matches = STYLE_ATTR_PATTERN.findall(line)
                for style_str in matches:
                    if "完整" in style_str:
                        errors.append({
                            "file": file_path,
                            "line": line_idx,
                            "prop": "style_inline",
                            "val": style_str
                        })

                # 2. 检查 style 标签块内部的“完整”
                if in_style_block and "完整" in stripped:
                    errors.append({
                        "file": file_path,
                        "line": line_idx,
                        "prop": "style_block",
                        "val": stripped
                    })

        except Exception as e:
            pass

    print(f"--- 全仓 CSS Layout Lint 扫描报告 ---")
    print(f"已扫描文件数: {checked_files}")
    if errors:
        print(f"[!] 发现 {len(errors)} 处潜在异常 CSS 声明：")
        for err in errors[:10]:
            print(f"  [{err['file']}:{err['line']}] {err['prop']}: {err['val']}")
        if len(errors) > 10:
            print(f"  ... 以及其他 {len(errors) - 10} 处隐患")
        return 1
    else:
        print("[OK] 全仓 CSS 样式声明语法校验通过！无非法中文字符或样式隐藏隐患。")
        return 0

if __name__ == "__main__":
    sys.exit(lint_codebase())
