"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-[url('/YAHO_logo/Subtract.png')] bg-cover bg-no-repeat bg-center text-white h-full w-full">
			{/* <div className="max-w-7xl flex flex-col md:flex-row justify-between lg:p-32 md:p-20 lg:mt-24"> */}
			<div className="flex flex-col lg:flex-row justify-between xl:py-30 xl:px-40 xl:mt-28 lg:p-24 lg:mt-20 pt-30 sm:px-30 px-10 pb-10 mt-20 gap-10">
				{/* 左側聯絡資訊 */}
				<div className="space-y-3 text-sm sm:text-base font-bold leading-relaxed w-full">
					<p>地址：台中市北屯區環中路一段485號</p>
					<p>電話：04-25601662</p>
					<p>傳真：04-25601662</p>
					<p>信箱：yaho-sales@zcstcl.com</p>
				</div>

				{/* 右側 Logo + 著作權 + 連結 */}
				<div className="lg:text-center md:text-left xl:text-right space-y-4 w-full ">
					{/* Logo 圖片（請根據實際路徑調整） */}
					<div className="flex justify-center md:justify-start xl:justify-end">
						<Image
							src="/YAHO_logo/logo_dark.jpg" // ✅ 請把 logo 放進 public 資料夾
							alt="YAHO Logo"
							width={600}
							height={80}
							className="object-contain"
						/>
					</div>

					{/* 著作權 */}
					<p className=" text-sm sm:text-base font-bold">
						Copyright © 2024 ZCSTCL All Rights Reserved.
					</p>

					{/* 連結列 */}
					<div className=" text-sm sm:text-base font-bold space-x-2">
						<Link href="/privacy" className="hover:underline">
							隱私權政策與使用條款
						</Link>
						<span>|</span>
						<Link href="/legal-trademark" className="hover:underline">
							法律與商標
						</Link>
						<span>|</span>
						<Link href="/about/locations" className="hover:underline">
							全球據點
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
