import json
import pandas as pd
import os
import sys

def flatten_json(data, parent_key='', sep='.'):
    """展開多層 JSON"""
    items = []
    for k, v in data.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_json(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

def compare_json(zh_file, en_file, output_excel):
    # 檢查檔案是否存在
    for file in [zh_file, en_file]:
        if not os.path.exists(file):
            print(f"❌ 找不到檔案: {file}")
            print("📂 當前資料夾內容：")
            for f in os.listdir(os.path.dirname(file) or '.'):
                print("   ", f)
            sys.exit(1)

    # 載入 JSON
    with open(zh_file, 'r', encoding='utf-8') as f:
        zh_data = json.load(f)
    with open(en_file, 'r', encoding='utf-8') as f:
        en_data = json.load(f)

    # 攤平成一層
    zh_flat = flatten_json(zh_data)
    en_flat = flatten_json(en_data)

    # 整理成表格
    rows = []
    for key in sorted(set(zh_flat.keys()) | set(en_flat.keys())):
        rows.append({
            "key": key,
            "中文": zh_flat.get(key, ""),
            "英文": en_flat.get(key, "")
        })

    df = pd.DataFrame(rows)

    # 匯出 Excel
    df.to_excel(output_excel, index=False)
    print(f"✅ 已輸出: {output_excel}")

# ===== 主程式入口 =====
if __name__ == "__main__":
    # 這裡改成你的 JSON 實際路徑
    zh_file = r"C:\Users\A0308\Desktop\Yaho_trans\messages\zh.json"
    en_file = r"C:\Users\A0308\Desktop\Yaho_trans\messages\en.json"
    output_excel = r"C:\Users\A0308\Desktop\Yaho_trans\output.xlsx"
    compare_json(zh_file, en_file, output_excel)
