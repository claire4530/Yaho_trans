"use client";

import React, { useState, useEffect, useTransition, memo } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import JSZip from "jszip"; 
import { saveAs } from "file-saver"; 
import { SAMPLE_DATA, PageData, MENU_STRUCTURE } from "./adminData"; 

interface AdminClientProps {
  session: Session;
}

// ==========================================
// 🚀 效能優化元件：防抖動輸入框 (Memoized)
// ==========================================
const DebouncedInput = memo(({ 
  value, 
  onChange, 
  isTextarea = false,
  className = ""
}: { 
  value: string, 
  onChange: (val: string) => void,
  isTextarea?: boolean,
  className?: string
}) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => { setLocalValue(value); }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value); 
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [localValue, onChange, value]);

  if (isTextarea) return <textarea className={className} value={localValue} onChange={handleChange} />;
  return <input className={className} value={localValue} onChange={handleChange} />;
});
DebouncedInput.displayName = "DebouncedInput";

// ==========================================
// 🔧 遞迴表單元件 (使用 memo 避免不必要的渲染)
// ==========================================
const RecursiveField = memo(({ label, value, onChange, level = 0 }: any) => {
  if (Array.isArray(value)) {
    return (
      <div className="mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <label className="block text-gray-700 font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
          {label} <span className="text-xs font-normal text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">清單</span>
        </label>
        <div className="space-y-4 pl-2 border-l-2 border-gray-200">
          {value.map((item: any, idx: number) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-6 top-3 text-gray-400 text-xs w-4 text-right">{idx + 1}.</span>
              <RecursiveField 
                label={`項目 ${idx + 1}`}
                value={item}
                onChange={(newVal: any) => {
                  const newArr = [...value];
                  newArr[idx] = newVal;
                  onChange(newArr);
                }}
                level={level + 1}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (typeof value === 'object' && value !== null) {
    return (
      <div className={`mb-6 rounded-xl ${level === 0 ? '' : 'bg-white p-5 border border-gray-200 shadow-sm'}`}>
        {level > 0 && (
          <h4 className="font-bold text-[#1c486f] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-[#F3981B]"></span>{label}
          </h4>
        )}
        <div className={level > 0 ? "grid grid-cols-1 gap-6" : "space-y-6"}>
          {Object.keys(value).map((childKey) => (
            <RecursiveField
              key={childKey}
              label={childKey}
              value={value[childKey]}
              onChange={(newChildVal: any) => onChange({ ...value, [childKey]: newChildVal })}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    );
  }
  const isLongText = typeof value === 'string' && (value.length > 40 || label.toLowerCase().includes('description') || label.toLowerCase().includes('detail'));
  return (
    <div className="w-full">
      <label className="block text-gray-600 font-bold mb-1.5 text-sm">{label}</label>
      <DebouncedInput
        isTextarea={isLongText}
        className={`w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c486f]/30 text-gray-700 shadow-sm transition ${isLongText ? 'min-h-[100px] leading-relaxed resize-y' : ''}`}
        value={value}
        onChange={(val) => onChange(val)}
      />
    </div>
  );
});
RecursiveField.displayName = "RecursiveField";

// ==========================================
// 📋 表單轉換器
// ==========================================
const JsonToFormEditor = memo(({ jsonContent, onChange }: { jsonContent: string, onChange: (newJson: string) => void }) => {
  const [parsedData, setParsedData] = useState<any>(null); // 改為 null 初始值
  
  useEffect(() => {
    try { setParsedData(JSON.parse(jsonContent)); } catch (e) { console.error(e); }
  }, [jsonContent]);

  const handleRootChange = (newData: any) => {
    setParsedData(newData);
    onChange(JSON.stringify(newData, null, 4));
  };

  // 在資料解析完成前顯示 Loading，避免畫面閃爍
  if (!parsedData) return <div className="p-4 text-gray-400 text-sm animate-pulse">正在載入表單資料...</div>;

  return <RecursiveField label="root" value={parsedData} onChange={handleRootChange} level={0} />;
});
JsonToFormEditor.displayName = "JsonToFormEditor";


// ==========================================
// 🏠 主程式 (AdminClient)
// ==========================================

export default function AdminClient({ session }: AdminClientProps) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Record<string, PageData>>(SAMPLE_DATA);
  const [blockRemarks, setBlockRemarks] = useState<Record<string, string>>({});
  
  const [selectedGroup, setSelectedGroup] = useState(MENU_STRUCTURE[0].id);
  // ★ 新增：使用 useTransition 優化切換體驗
  const [isPending, startTransition] = useTransition();

  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [isPacking, setIsPacking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("admin_draft_db");
    const storedRemarks = localStorage.getItem("admin_block_remarks_db");

    if (stored) {
      try {
        const storedData = JSON.parse(stored);
        const mergedData = { ...SAMPLE_DATA };
        Object.keys(SAMPLE_DATA).forEach(key => {
          if (storedData[key]) {
            mergedData[key] = {
               ...SAMPLE_DATA[key],
               content: storedData[key].content || SAMPLE_DATA[key].content,
               images: (storedData[key].images && storedData[key].images.length > 0) ? storedData[key].images : SAMPLE_DATA[key].images
            };
          }
        });
        setData(mergedData);
      } catch (e) { setData(SAMPLE_DATA); }
    }
    if (storedRemarks) {
      try { setBlockRemarks(JSON.parse(storedRemarks)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        localStorage.setItem("admin_draft_db", JSON.stringify(data));
        localStorage.setItem("admin_block_remarks_db", JSON.stringify(blockRemarks));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data, blockRemarks, mounted]);

  // ★ 處理切換分頁的函式
  const handleGroupSwitch = (groupId: string) => {
    // 使用 startTransition 包裹，告訴 React 這是一個「可以稍微等一下」的更新
    startTransition(() => {
      setSelectedGroup(groupId);
    });
  };

  function updateContent(slug: string, newContent: string) {
    setData(prev => ({ ...prev, [slug]: { ...prev[slug], content: newContent } }));
  }

  function handleImageReplace(e: React.ChangeEvent<HTMLInputElement>, slug: string, targetImageId: number) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setData(prev => {
        const currentImages = [...prev[slug].images];
        const index = currentImages.findIndex(img => img.id === targetImageId);
        if (index !== -1) {
          currentImages[index] = { ...currentImages[index], src: ev.target?.result as string, name: `(新) ${file.name}` };
        }
        return { ...prev, [slug]: { ...prev[slug], images: currentImages } };
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handlePreviewReport() {
    const currentGroup = MENU_STRUCTURE.find(g => g.id === selectedGroup);
    if (!currentGroup) return;

    let report = `【官網修改申請單 - ${currentGroup.name}】\n`;
    report += `申請人：${session.user?.name} (${session.user?.email})\n`;
    report += `填寫時間：${new Date().toLocaleString()}\n`;
    report += `------------------------------------------\n`;
    
    let hasChanges = false;

    currentGroup.sections.forEach(slug => {
        const currentSection = data[slug];
        const originalSection = SAMPLE_DATA[slug]; 
        const remark = blockRemarks[slug]; 
        if(!currentSection) return;

        let contentDiff = "";
        try {
          const curObj = JSON.parse(currentSection.content);
          const orgObj = JSON.parse(originalSection.content);
          const compareObj = (cur: any, org: any, path: string) => {
            if (typeof cur !== typeof org) return;
            if (typeof cur === 'string') {
               if (cur !== org) {
                 contentDiff += `\n[修改] ${path}\n   原：${org}\n   改：${cur}\n`;
                 hasChanges = true;
               }
            } else if (typeof cur === 'object' && cur !== null) {
              Object.keys(cur).forEach(key => compareObj(cur[key], org?.[key], path ? `${path}.${key}` : key));
            }
          };
          
          compareObj(curObj, orgObj, "");
        } catch(e) {}

        let imageDiff = "";
        currentSection.images.forEach(img => {
           if (img.src.startsWith("data:")) {
             imageDiff += `\n- 更換圖片：${img.name} (請見附件)\n`;
             hasChanges = true;
           }
        });

        if (contentDiff || imageDiff || (remark && remark.trim() !== "")) {
          report += `\n● 區塊：${currentSection.title}\n`;
          if (contentDiff) report += contentDiff;
          if (imageDiff) report += imageDiff;
          if (remark && remark.trim() !== "") {
              report += `\n★ 修改備註：\n${remark}\n`;
              hasChanges = true;
          }
          report += `\n------------------------------------------\n`;
        }
    });

    if (!hasChanges) {
      alert("⚠️ 系統偵測到您沒有修改任何內容，也沒有填寫備註。");
      return;
    }
    setRequestText(report);
    setShowModal(true);
  }

  async function handleDownloadPackage() {
    setIsPacking(true);
    const zip = new JSZip();
    const currentGroup = MENU_STRUCTURE.find(g => g.id === selectedGroup);
    
    const reportName = `修改需求單_${currentGroup?.name}.txt`;
    zip.file(reportName, requestText);

    if (currentGroup) {
      const imgFolder = zip.folder("images");
      currentGroup.sections.forEach(slug => {
        const currentSection = data[slug];
        if (currentSection) {
          currentSection.images.forEach((img, idx) => {
            if (img.src.startsWith("data:image")) {
              const base64Data = img.src.split(',')[1];
              const fileName = `${slug}_${idx+1}_${img.name.replace('(新) ', '')}`;
              imgFolder?.file(fileName, base64Data, {base64: true});
            }
          });
        }
      });
    }

    const blob = await zip.generateAsync({type:"blob"});
    saveAs(blob, `官網修改包_${new Date().toISOString().slice(0,10)}.zip`);
    setIsPacking(false);
  }

  function handleReset() {
    if(confirm("確定重置？這會清除所有暫存修改。")) {
      localStorage.removeItem("admin_draft_db");
      localStorage.removeItem("admin_block_remarks_db");
      window.location.reload();
    }
  }

  if (!mounted) return <div className="min-h-screen flex items-center justify-center text-[#1c486f]">載入中...</div>;

  const currentGroup = MENU_STRUCTURE.find(g => g.id === selectedGroup);

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      
      {/* 1. Header: 使用你修改後的深藍色與 Logo */}
      <header className="bg-[#1c486f] text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* 確保圖片路徑正確，加入 CSS 確保不跑版 */}
          <img width={400} height={40} src="/YAHO_logo/logo_dark.jpg" alt="ZCSTCL Logo" className="h-10 w-auto object-contain rounded px-2" />
          <div className="h-6 w-px bg-white/20"></div>
          <h1 className="text-lg font-bold tracking-wide">官網內容管理</h1>
        </div>

        <div className="flex gap-3">
            <button onClick={handleReset} className="text-xs bg-red-500/30 px-3 py-1 rounded hover:bg-red-500 transition border border-red-500/50">重置</button>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition">登出</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 左側選單 */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto z-40">
           <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-500 text-xs">網站頁面</div>
           <ul className="p-2 space-y-1">
             {MENU_STRUCTURE.map(group => (
               <li key={group.id}>
                 <button
                   onClick={() => handleGroupSwitch(group.id)} // 使用新的切換函式
                   className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition
                     ${selectedGroup === group.id 
                       ? "bg-[#1c486f] text-white shadow-md" 
                       : "text-gray-600 hover:bg-gray-100"}`}
                 >
                   {group.name}
                 </button>
               </li>
             ))}
           </ul>
        </aside>

        {/* 右側主畫面 */}
        <section className="flex-1 overflow-y-auto bg-gray-100 p-6 sm:p-10 scroll-smooth relative">
          
          {/* ★ 待機動畫遮罩：當正在計算大量表單時顯示 */}
          {isPending && (
             <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                   <svg className="animate-spin h-10 w-10 text-[#1c486f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   <span className="text-[#1c486f] font-bold text-sm">正在載入頁面資料...</span>
                </div>
             </div>
          )}

          <div className={`max-w-6xl mx-auto pb-20 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
            
            <div className="flex justify-between items-end mb-8">
               <div>
                 <h2 className="text-3xl font-bold text-[#1c486f]">{currentGroup?.name}</h2>
                 <p className="text-gray-500 mt-1 text-sm">修改完成後，請點擊按鈕預覽並打包資料。</p>
               </div>
               <button 
                 onClick={handlePreviewReport}
                 className="bg-[#F3981B] hover:bg-[#d68516] text-white px-6 py-3 rounded-xl shadow-lg font-bold flex items-center gap-2 transform active:scale-95 transition"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                 </svg>
                 產生修改清單
               </button>
            </div>

            <div className="space-y-8">
              {currentGroup?.sections.map((slug, index) => {
                const sectionData = data[slug];
                if (!sectionData) return null;

                return (
                  <div key={slug} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <span className="bg-[#1c486f] text-white text-xs font-mono px-2 py-1 rounded">{index + 1}</span>
                          <h3 className="font-bold text-lg text-gray-800">{sectionData.title}</h3>
                       </div>
                    </div>

                    <div className="p-6">
                      {/* 1. 圖片區 */}
                      {sectionData.images.length > 0 && (
                        <div className="mb-8">
                           <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">圖片素材</h4>
                           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                             {sectionData.images.map(img => (
                               <div key={img.id} className="relative group">
                                 <label className="cursor-pointer block relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#F3981B] transition-all">
                                    <img src={img.src} className="w-full h-full object-cover" alt={img.name} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white">
                                       <span className="text-xs font-bold">更換圖片</span>
                                    </div>
                                    <input 
                                      type="file" accept="image/*" className="hidden" 
                                      onChange={(e) => handleImageReplace(e, slug, img.id)}
                                    />
                                 </label>
                                 <p className="text-xs text-center mt-2 text-gray-500 truncate">
                                   {img.name.startsWith("(新)") ? <span className="text-red-500 font-bold">{img.name}</span> : img.name}
                                 </p>
                               </div>
                             ))}
                           </div>
                        </div>
                      )}

                      {/* 2. 表單區 */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">內容編輯</h4>
                        <div className="p-1">
                           <JsonToFormEditor 
                             jsonContent={sectionData.content} 
                             onChange={(newVal) => updateContent(slug, newVal)}
                           />
                        </div>
                      </div>

                      {/* 3. 區塊備註 */}
                      <div className="mt-8 pt-6 border-t border-gray-100">
                         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 relative focus-within:ring-2 focus-within:ring-yellow-400/50 transition">
                            <label className="block text-yellow-800 text-sm font-bold mb-2 flex items-center gap-2">
                              <span className="bg-yellow-200 text-yellow-800 p-1 rounded">📝 備註</span>
                              此區塊修改需求說明
                            </label>
                            <DebouncedInput 
                              isTextarea 
                              className="w-full bg-white/50 border border-yellow-200 rounded p-3 text-sm text-gray-700 placeholder-yellow-700/30 focus:outline-none focus:bg-white transition resize-none"
                              value={blockRemarks[slug] || ""}
                              onChange={(val) => setBlockRemarks(prev => ({...prev, [slug]: val}))}
                            />
                         </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      </div>

      {/* Modal 申請單彈窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#1c486f] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">📦 下載修改懶人包</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            <div className="p-6 bg-gray-50 border-b border-gray-200">
               <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex gap-3 items-start border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-bold mb-1">操作步驟：</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>點擊下方 <span className="font-bold">「下載 ZIP 懶人包」</span>。</li>
                      <li>點擊 <span className="font-bold">「複製文字」</span>。</li>
                      <li>前往 Webmail 寄信，貼上內文並 <span className="font-bold">上傳 ZIP 檔作為附件</span>。</li>
                      <li>收件人請填 <span className="font-bold">claire.chang@zcstcl.com</span></li>
                    </ol>
                  </div>
               </div>
            </div>

            <div className="p-0 overflow-y-auto bg-gray-50 flex-1">
               <textarea 
                readOnly
                className="w-full h-full min-h-[300px] p-6 bg-white border-0 font-mono text-sm focus:outline-none text-gray-700 resize-none leading-relaxed"
                value={requestText}
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            
            <div className="p-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row gap-4">
               <button 
                 onClick={handleDownloadPackage} 
                 disabled={isPacking}
                 className="flex-1 bg-[#1c486f] text-white py-3 rounded-xl font-bold hover:bg-[#163a5a] transition flex justify-center items-center gap-2 shadow-lg"
               >
                 {isPacking ? (
                   "📦 打包中..."
                 ) : (
                   <>
                     <svg xmlns="http://www.w3.org/2000/svgH" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                     </svg>
                     1. 下載 ZIP 懶人包
                   </>
                 )}
               </button>
               
               <button onClick={() => navigator.clipboard.writeText(requestText).then(()=>alert("複製成功"))} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                 2. 複製文字
               </button>
               
               <a href="https://ccmail.zcstcl.com/" target="_blank" className="flex-1 bg-[#F3981B] text-white py-3 rounded-xl font-bold text-center hover:bg-[#d68516] transition shadow-lg">
                 3. 前往 Webmail
               </a>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}