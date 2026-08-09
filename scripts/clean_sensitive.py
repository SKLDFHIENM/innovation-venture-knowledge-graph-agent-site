import glob
import os

replacements = [
    ("双创金课", "双创实战示范课"),
    ("国家级双创金课", "双创示范课"),
    ("国家级金课", "示范课"),
    ("金课", "示范课"),
    ("100% 本地离线隐私保护", "本地离线隐私保护"),
    ("100% 隐私保护", "本地离线隐私保护"),
    ("100%离线", "本地离线"),
    ("100%", "完整"),
    ("128 个", "28 个"),
    ("128个", "28个"),
    ("极速实战", "高效实战"),
    ("极速", "快速"),
    ("国赛路演", "竞赛路演"),
    ("国赛标准", "竞赛标准"),
    ("国赛评委", "竞赛评委"),
    ("省赛金奖", "竞赛优秀奖"),
    ("金奖", "优秀奖")
]

targets = (
    glob.glob("*.html") + 
    glob.glob("js/*.js") + 
    glob.glob("js/**/*.js", recursive=True) + 
    glob.glob("decks/*.html") + 
    glob.glob("scripts/*.js")
)

total_changes = 0
for fpath in targets:
    if not os.path.isfile(fpath):
        continue
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        new_content = content
        file_changes = 0
        for old, new in replacements:
            if old in new_content:
                c = new_content.count(old)
                new_content = new_content.replace(old, new)
                file_changes += c
        if file_changes > 0:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {fpath}: {file_changes} replacements")
            total_changes += file_changes
    except Exception as e:
        print(f"Error {fpath}: {e}")

print(f"Total sensitive/exaggerated word replacements: {total_changes}")
