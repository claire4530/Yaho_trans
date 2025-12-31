// app/admin/components/SingleFormEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { updateData, uploadImage } from "../actions";
import { FieldConfig } from "./UniversalCrud";

interface SingleFormProps {
  title: string;
  table: string;
  data: any; // 這會是單一物件，不是陣列
  fields: FieldConfig[];
}

export default function SingleFormEditor({ title, table, data, fields }: SingleFormProps) {
  // 如果資料庫是空的，給個空物件避免報錯
  const [formData, setFormData] = useState(data || {});
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [uploading, setUploading] = useState(false);

  // 當外部資料載入時，更新內部狀態 (避免初始 data 為 undefined)
  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (path: string, value: any) => {
    setFormData((prev: any) => {
      const newData = { ...prev };
      const keys = path.split('.');
      if (keys.length === 1) {
        newData[keys[0]] = value;
      } else if (keys.length === 2) {
        newData[keys[0]] = { ...newData[keys[0]], [keys[1]]: value };
      }
      return newData;
    });
    setStatus("idle");
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      // 固定更新 ID = 1 的那筆資料
      const { id, created_at, ...updatePayload } = formData;
      await updateData(table, 1, updatePayload);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  // 處理單張圖片上傳
  const handleSingleImageUpload = async (fieldKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const newUrl = await uploadImage(formData);
      handleChange(fieldKey, newUrl);
    } catch (err) {
      alert("上傳失敗");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-[#1c486f]">{title}</h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {fields.map((field) => {
            const keys = field.key.split('.');
            const value = keys.length === 2 ? formData[keys[0]]?.[keys[1]] : formData[field.key];

            // 圖片顯示邏輯
            if (field.type === "image") {
              return (
                <div key={field.key} className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{field.label}</label>
                  <div className="flex items-start gap-4">
                    {value ? (
                      <div className="relative group/img">
                        <img src={value} className="h-48 w-auto object-contain rounded-lg border border-gray-200 bg-gray-50" />
                        <button onClick={() => handleChange(field.key, null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600">✕</button>
                      </div>
                    ) : (
                      <div className="h-48 w-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">尚無圖片</div>
                    )}
                    <label className={`inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-50 transition ${uploading ? 'opacity-50' : ''}`}>
                      {uploading ? "上傳中..." : "更換圖片"}
                      <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleSingleImageUpload(field.key, e)} />
                    </label>
                  </div>
                </div>
              );
            }

            // 一般輸入框
            return (
              <div key={field.key} className={field.type === "textarea" ? "col-span-2" : ""}>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea value={value || ""} onChange={(e) => handleChange(field.key, e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:border-[#1c486f] outline-none min-h-[150px]" />
                ) : (
                  <input type="text" value={value || ""} onChange={(e) => handleChange(field.key, e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:border-[#1c486f] outline-none" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
             {status === "success" && <span className="text-green-600 text-xs font-bold animate-pulse">✓ 儲存成功</span>}
             <button onClick={handleSave} disabled={status === "saving"} className="bg-[#1c486f] text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-[#153655] shadow-md active:scale-95 transition-transform">
                {status === "saving" ? "儲存中..." : "儲存變更"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}