import glob
import os

replacements = [
    ("width: 完整;", "width: 100%;"),
    ("height: 完整;", "height: 100%;"),
    ("width:完整;", "width:100%;"),
    ("height:完整;", "height:100%;"),
    ("max-width: 完整", "max-width: 100%"),
    ("width: 完整", "width: 100%"),
    ("height: 完整", "height: 100%"),
    ("height:完整", "height:100%"),
    ("width:完整", "width:100%"),
    ("#00f2fe 完整", "#00f2fe 100%"),
    ("width:0;", "width:0;")
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
            print(f"Fixed CSS {fpath}: {file_changes} replacements")
            total_changes += file_changes
    except Exception as e:
        print(f"Error {fpath}: {e}")

print(f"Total CSS '完整' -> '100%' replacements: {total_changes}")
