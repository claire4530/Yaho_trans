// app/admin/components/UniversalCrud.tsx
"use client";

import { useState } from "react";
import { updateData, deleteData, createData, uploadImage } from "../actions";
import { Trash2, Save } from 'lucide-react';

// 1. 升級：擴充支援的欄位類型
export type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "textarea" | "date" | "boolean"| "images" | "image"; // 新增 date 和 boolean
};

interface CrudProps {
  title: string;
  table: string;
  data: any[];
  fields: FieldConfig[];
  defaultNewData: any;
}

export default function UniversalCrud({ title, table, data, fields, defaultNewData }: CrudProps) {
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        setIsCreating(true); // 加上這行讓 loading 狀態更明顯
        try {
        await createData(table, defaultNewData);
        // 成功後，setIsCreating(false) 會由頁面重整自動解決，或者手動設回 false
        setIsCreating(false);
        // 自動捲動到最上方 (選用)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
        alert("新增失敗");
        setIsCreating(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg text-[#1c486f]">{title}</h3>
            </div>

            <div className="divide-y divide-gray-100">
                {data.length === 0 ? (
                <div className="p-8 text-center text-gray-400">目前沒有資料，請點擊右下角按鈕新增。</div>
                ) : (
                data.map((item) => (
                    <SingleItemEditor key={item.id} item={item} table={table} fields={fields} />
                ))
                )}
            </div>
            {/* 2. ★ 新增：懸浮按鈕 (FAB) */}
            <button 
                onClick={handleCreate}
                disabled={isCreating}
                title="新增一筆資料"
                className={`
                fixed bottom-10 right-10 z-50 
                w-16 h-16 rounded-full shadow-2xl 
                flex items-center justify-center 
                text-white transition-all transform hover:scale-110 active:scale-95
                ${isCreating ? "bg-gray-400 cursor-not-allowed" : "bg-[#F3981B] hover:bg-[#d68516]"}
                `}
            >
                {isCreating ? (
                // Loading 轉圈圈動畫
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ) : (
                // 大大的加號圖示
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                )}
            </button>
        </div>
    );
}

function SingleItemEditor({ item, table, fields }: { item: any, table: string, fields: FieldConfig[] }) {
    const [formData, setFormData] = useState(item);
    const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
    const [uploading, setUploading] = useState(false); // 新增上傳狀態

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
        const { id, created_at, ...updatePayload } = formData;
        await updateData(table, item.id, updatePayload);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000);
        } catch (e) {
        setStatus("error");
        }
    };

    const handleDelete = async () => {
        if (!confirm("確定要刪除這筆資料嗎？")) return;
        await deleteData(table, item.id);
    };

    const handleImageUpload = async (fieldKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
        const formData = new FormData();
        formData.append('file', file);
        
        // 1. 上傳到雲端拿到網址
        const newUrl = await uploadImage(formData);

        // 2. 更新本地的陣列資料 (原本的圖 + 新圖)
        setFormData((prev: any) => {
            const currentImages = prev[fieldKey] || [];
            return { ...prev, [fieldKey]: [...currentImages, newUrl] };
        });
        } catch (err) {
        alert("上傳失敗");
        } finally {
        setUploading(false);
        // 清空 input 讓使用者可以重複選同一張圖
        e.target.value = ''; 
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
        // 直接更新欄位為字串
        handleChange(fieldKey, newUrl); 
        } catch (err) {
        alert("上傳失敗");
        } finally {
        setUploading(false);
        }
    };

    // ★ 新增：移除某張圖片
    const removeImage = (fieldKey: string, indexToRemove: number) => {
        if(!confirm("確定移除這張圖片嗎？(儲存後生效)")) return;
        
        setFormData((prev: any) => {
        const currentImages = prev[fieldKey] || [];
        return { 
            ...prev, 
            [fieldKey]: currentImages.filter((_: any, idx: number) => idx !== indexToRemove) 
        };
        });
    };

  return (
    <div className="p-6 hover:bg-gray-50 transition group">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {fields.map((field) => {
            const keys = field.key.split('.');
            const value = keys.length === 2 ? formData[keys[0]]?.[keys[1]] : formData[field.key];

            // === 新增：單張圖片處理 ===
            if (field.type === "image") {
                return (
                <div key={field.key} className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{field.label}</label>
                    <div className="flex items-start gap-4">
                    {/* 預覽區 */}
                    {value ? (
                        <div className="relative group/img">
                        <img src={value} className="h-32 w-auto object-cover rounded-lg border border-gray-200 shadow-sm" />
                        <button 
                            onClick={() => handleChange(field.key, null)} // 清除圖片
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                            title="移除圖片"
                        >✕</button>
                        </div>
                    ) : (
                        <div className="h-32 w-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                        尚無圖片
                        </div>
                    )}
                    
                    {/* 上傳按鈕 */}
                    <div className="mt-2">
                        <label className={`inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 cursor-pointer hover:bg-gray-50 transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        {uploading ? "上傳中..." : "更換圖片"}
                        <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => handleSingleImageUpload(field.key, e)} />
                        </label>
                        <p className="text-xs text-gray-400 mt-2">支援 jpg, png 格式</p>
                    </div>
                    </div>
                </div>
                );
            }
            // === 這裡開始是顯示邏輯 ===
            if (field.type === "images") {
                const images = Array.isArray(value) ? value : [];
                return (
                <div key={field.key} className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{field.label}</label>
                    
                    {/* 圖片預覽區 */}
                    <div className="flex flex-wrap gap-3 mb-3">
                    {images.map((imgUrl: string, idx: number) => (
                        <div key={idx} className="relative w-24 h-24 group/img">
                        <img src={imgUrl} className="w-full h-full object-cover rounded border border-gray-200" />
                        <button 
                            onClick={() => removeImage(field.key, idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover/img:opacity-100 transition shadow-sm"
                        >
                            ✕
                        </button>
                        </div>
                    ))}
                    
                    {/* 上傳按鈕 (偽裝成方塊) */}
                    <label className={`w-24 h-24 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-[#1c486f] hover:text-[#1c486f] text-gray-400 transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <span className="text-2xl font-light">+</span>
                        <span className="text-xs">{uploading ? "上傳中" : "新增圖片"}</span>
                        <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={uploading}
                        onChange={(e) => handleImageUpload(field.key, e)} 
                        />
                    </label>
                    </div>
                </div>
                );
            }
            // 2. 升級：根據不同類型顯示不同輸入框
            return (
                <div key={field.key} className={field.type === "textarea" ? "col-span-2" : ""}>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    {field.label}
                </label>
                
                {field.type === "textarea" ? (
                    <textarea
                    value={value || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:border-[#1c486f] outline-none min-h-[80px]"
                    />
                ) : field.type === "boolean" ? (
                    <div className="flex items-center gap-2 h-10">
                    <input 
                        type="checkbox"
                        checked={!!value} // 確保是 boolean
                        onChange={(e) => handleChange(field.key, e.target.checked)}
                        className="w-5 h-5 text-[#1c486f] rounded focus:ring-[#1c486f]"
                    />
                    <span className="text-sm text-gray-700">{value ? "顯示中" : "已隱藏"}</span>
                    </div>
                ) : (
                    <input
                    type={field.type === "date" ? "date" : "text"} // 這裡支援 text 和 date
                    value={value || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:border-[#1c486f] outline-none"
                    />
                )}
                </div>
            );
            })}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
            <button onClick={handleDelete} className="flex px-3 py-2 bg-red-500 text-white text-xs hover:bg-red-600 rounded-md shadow-sm font-bold transition">
                <Trash2 className="inline-block w-4 h-4 mr-1 " />
                <p className="text-sm">刪除此項目</p>
            </button>
            <div className="flex items-center gap-3">
            {status === "success" && <span className="text-green-600 text-xs font-bold animate-pulse">✓ 儲存成功</span>}
            {status === "error" && <span className="text-red-600 text-xs font-bold">儲存失敗</span>}
            <button onClick={handleSave} disabled={status === "saving"} 
                    className={`px-3 py-2 rounded-md text-sm shadow-sm font-bold text-white transition ${status === "saving" ? "bg-gray-400" : "bg-[#1c486f] hover:bg-[#153655]"}`}>
                <Save className="inline-block w-4 h-4 mr-1" />
                {status === "saving" ? "儲存中..." : "儲存變更"}
            </button>
            </div>
        </div>
        </div>
    );
    }