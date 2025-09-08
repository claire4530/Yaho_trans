"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("Footer");
	return (
		<footer className="bg-[url('/YAHO_logo/Subtract.png')] bg-cover bg-no-repeat bg-center text-white h-full w-full">
			{/* <div className="max-w-7xl flex flex-col md:flex-row justify-between lg:p-32 md:p-20 lg:mt-24"> */}
			<div className="flex flex-col lg:flex-row justify-between xl:py-30 xl:px-40 xl:mt-28 lg:p-24 lg:mt-20 pt-30 sm:px-30 px-10 pb-10 mt-20 gap-10">
				{/* 左側聯絡資訊 */}
				<div className="space-y-3 text-sm sm:text-base font-bold leading-relaxed w-full">
					<p>{t("address")}</p>
					<p>{t("phone")}</p>
					<p>{t("fax")}</p>
					<p>{t("email")}</p>
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
						{t("rights")}
					</p>

					{/* 連結列 */}
					<div className=" text-sm sm:text-base font-bold space-x-2">
						{/* <Link href="/privacy" className="hover:underline">
							隱私權政策與使用條款
						</Link>
						<span>|</span>
						<Link href="/legal-trademark" className="hover:underline">
							法律與商標
						</Link>
						<span>|</span>
						<Link href="/about/locations" className="hover:underline">
							全球據點
						</Link> */}
						<Link href="/privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
							{t("privacy")}
						</Link>
						<span>|</span>
						<Link href="/legal-trademark" onClick={(e) => e.preventDefault()} className="hover:underline">
							{t("legal")}
						</Link>
						<span>|</span>
						<Link href="/about/locations" onClick={(e) => e.preventDefault()} className="hover:underline">
							{t("global")}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
