// "use client";

// import { useState, useEffect } from "react";
// import Fuse from "fuse.js";
// import { useRouter } from "next/navigation";

// type CoreValueItem = {
//   slogan: string;
//   details: string;
//   url: string;
// };

// export default function SearchComponent() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<CoreValueItem[]>([]);
//   const [allData, setAllData] = useState<CoreValueItem[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch JSON 檔案資料
//     fetch("/messages/zh.json")
//       .then((res) => res.json())
//       .then((jsonData) => {
//         const coreValue = jsonData.CoreValue;
//         const flattenedData: CoreValueItem[] = Object.values(coreValue);
//         setAllData(flattenedData);
//       });
//   }, []);

//   const handleSearch = () => {
//     if (!query.trim() || allData.length === 0) return;

//     const fuse = new Fuse(allData, {
//       keys: ["slogan", "details"],
//       threshold: 0.3,
//     });

//     const found = fuse.search(query);
//     const resultList = found.map((res) => res.item);
//     setResults(resultList);
//   };

//   const handleNavigate = (url: string) => {
//     router.push(url);
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="輸入關鍵字，如：專業"
//           className="p-2 border rounded w-full"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           搜尋
//         </button>
//       </div>

//       {results.length > 0 && (
//         <div className="space-y-4">
//           <h2 className="text-lg font-bold">搜尋結果：</h2>
//           <ul className="space-y-2">
//             {results.map((item, idx) => (
//               <li
//                 key={idx}
//                 className="bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 cursor-pointer"
//                 onClick={() => handleNavigate(item.url)}
//               >
//                 <p className="font-semibold text-[#1C466C]">{item.slogan}</p>
//                 <p className="text-sm text-gray-700">{item.details}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
