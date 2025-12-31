// app/admin/actions.ts
'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// 1. 萬用更新 (Update)
export async function updateData(table: string, id: number, data: any) {
    const supabase = await createClient();
    const { error } = await supabase.from(table).update(data).eq('id', id);

    if (error) throw new Error(error.message);
    revalidatePath('/admin'); // 重新整理頁面
    return { success: true };
}

// 2. 萬用新增 (Create)
export async function createData(table: string, initialData: any) {
    const supabase = await createClient();
    const { error } = await supabase.from(table).insert(initialData);

    if (error) throw new Error(error.message);
    revalidatePath('/admin');
    return { success: true };
}

// 3. 萬用刪除 (Delete)
export async function deleteData(table: string, id: number) {
    const supabase = await createClient();
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) throw new Error(error.message);
    revalidatePath('/admin');
    return { success: true };
}

// ★ 新增：單檔上傳功能
export async function uploadImage(formData: FormData) {
    const supabase = await createClient();

    const file = formData.get('file') as File;
    if (!file) throw new Error("No file found");

    // 1. 取得副檔名 (例如 png, jpg)，並轉成小寫以防萬一
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';

    // 2. 產生一個純英文數字的檔名 (時間戳記 + 6位亂數)
    // 這樣就解決了中文檔名和空格的問題
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // 3. 設定上傳路徑
    const filePath = `uploads/${fileName}`;

    // 上傳到 'images' bucket
    const { error } = await supabase.storage
        .from('images') // 確保你的 Supabase Storage 有這個 bucket 並且是 Public
        .upload(filePath, file);

    if (error) {
        console.error('Upload Error:', error);
        throw new Error('圖片上傳失敗');
    }

    // 取得公開網址
    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    return data.publicUrl;
}