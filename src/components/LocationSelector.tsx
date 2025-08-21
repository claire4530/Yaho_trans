import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { MapPinned, Phone, Mail, Clock } from 'lucide-react';
type BranchData = {
  country: string;
  name: string;
  phone: string;
  mail: string;
  address: string;
  content: string;
  imageUrl: string;
  mapEmbed?: string;
};

const countries = ["Taiwan", "Japan", "USA", "Germany", "Singapore"];

const embedMap: Record<string, string> = {
  	"Taiwan-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.1751899851147!2d120.68961027512995!3d24.20064317836592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469179eff25048b%3A0xca382336ec6075f!2zNDA25Y-w54Gj5Y-w5Lit5biC5YyX5bGv5Y2A55Kw5Lit6Lev5LiA5q61NDg16Jmf!5e0!3m2!1szh-TW!2sus!4v1754533882444!5m2!1szh-TW!2sus",
  	"Taiwan-2": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.849777491161!2d121.56666671542908!3d25.033964284328175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abbf20a27f0d%3A0x9e1d50c5a25c21e!2z5Y-w5YyX5biC5p2x5Y2A5paw5YyX6LevMTIz6Jmf!5e0!3m2!1szh-TW!2stw!4v1690000000001",
  	"Taiwan-3": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.4123456!2d120.300000!3d22.620000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e04d2ec5b4e2d%3A0xa33ee6a90bb76555!2z5Y-w5YyX5biC6I-v5Y-w5Y2A5Lit5q2j6KGX6LevNDU26Jmf!5e0!3m2!1szh-TW!2stw!4v1690000000002",
  	"Taiwan-4": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.12345678!2d120.964999!3d24.794722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346834f258e9e96d%3A0xf70ea2b5efb6d309!2z5Y-w5YyX5biC5paw5YyX5Y2A5YWJ5qWt6LevMTIz6Jmf!5e0!3m2!1szh-TW!2stw!4v1690000000003",

  	"USA-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.7590289179345!2d-118.24368468478408!3d34.05223548060667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7bce472b0fb%3A0x5562a441bdd2bb1f!2zTG9zIEFuZ2VsZXMsIENBLCBVU0E!5e0!3m2!1sen!2sus!4v1690000000004",

  	"Japan-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.844535936671!2d135.49720481548952!3d34.70248558043142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e0e84e12f321%3A0x84fbd0e7e4f97a0d!2zT3NhY2EsIEphcGFu!5e0!3m2!1sja!2sjp!4v1690000000006",

  	"Germany-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.6903345324377!2d13.405838315626138!3d52.52000627981254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c9fd18b8d1%3A0xb90e5f7f8aa8a42b!2zQmVybGluLCDlpKflrabpmpop!5e0!3m2!1sde!2sde!4v1690000000007",

  	"Singapore-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.12345678!2d103.851959!3d1.290270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da196a0aead97f%3A0xf8bd4f0c38b3f5f9!2zU2luZ2Fwb3JlIENpdHkgQ2VudGVy!5e0!3m2!1sen!2ssg!4v1690000000008"
};

export function useBranchData(): BranchData[] {
	const t = useTranslations("about");
    
	const result: BranchData[] = [];
	
	countries.forEach((country) => {
		const total = Number(t.raw(`locations.country.${country}.branchesTotal`)) || 0;

		for (let i = 1; i <= total; i++) {
		const name = t(`locations.country.${country}.branches${i}`);
		if (!name || name.includes("locations.country")) continue;
   
		const key = `${country}-${i}`;
		const branch: BranchData = {
			country,
			name,
			phone: t(`locations.country.${country}.phone${i}`),
			mail: t(`locations.country.${country}.mail${i}`),
			address: t(`locations.country.${country}.address${i}`),
			content: t(`locations.country.${country}.content${i}`),
			// imageUrl: `/about/career/${country.toLowerCase()}-${i}.jpg`, // 你可以自訂這邊邏輯
			imageUrl: "/frontPage/1.jpg",
			mapEmbed: embedMap[key], // 自動根據 country-index 對應嵌入地圖
		};

		result.push(branch);
		}
	});
	return result;
}

export default function LocationSelector() {
	const t = useTranslations("about");

	const [selectedCountry, setSelectedCountry] = useState<string | null>("All");


	const allBranches = useBranchData();

	const defaultBranch = allBranches.find(
	(b) => b.country === "Taiwan" && b.name.includes("台中")
	);

  	const [selectedBranch, setSelectedBranch] = useState<BranchData | null>(defaultBranch ?? null);

	const filteredBranches = selectedCountry && selectedCountry !== "All"
		? allBranches.filter((b) => b.country === selectedCountry)
		: allBranches;

	return (
		<div className="p-6 space-y-8">
			{/* 國家選單 + Carousel */}
			<div className="space-y-8">
				<Select onValueChange={(value) => {
					setSelectedCountry(value);

					if (value === "All") {
						const fallback = allBranches.find(
						(b) => b.country === "Taiwan" && b.name.includes("台中")
						);
						setSelectedBranch(fallback ?? null);
					} else {
						// 選擇特定國家 → 設定該國的第一個 branch
						const firstBranchOfCountry = allBranches.find((b) => b.country === value);
						setSelectedBranch(firstBranchOfCountry ?? null);
					}
				}}>
					<SelectTrigger className="w-[200px] mx-5">
						<SelectValue placeholder="Select a country" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All</SelectItem>
						{countries.map((c) => (
						<SelectItem key={c} value={c}>{c}</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Carousel className="w-full">
					<CarouselContent>
						{filteredBranches.map((branch, index) => (
							<CarouselItem key={index} className=" md:basis-1/2 lg:basis-2/5">
								<Card onClick={() => setSelectedBranch(branch)} className="pt-0 mx-2 my-5 lg:m-5 border-0 shadow-lg cursor-pointer 
																							hover:scale-103 transition-transform duration-300">
									<Image
										src={branch.imageUrl}
										alt={branch.name}
										width={400}
										height={300}
										className="w-full h-[300px] object-cover rounded-t-xl"
									/>
									<CardContent className="px-4">
										<h3 className="text-lg font-semibold py-0 lg:py-2">{branch.name}</h3>
										<p className="text-sm text-gray-500 line-clamp-2">{branch.content}</p>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			{/* 詳細區塊 */}
			{selectedBranch && (
				<div className="grid md:grid-cols-2 rounded-lg items-stretch shadow-[0_5px_20px_rgba(0,0,0,0.1),0_-5px_20px_rgba(0,0,0,0.1)] m-2 lg:m-5">

					{/* Google Map */}
					<div className="w-full h-[200px] md:h-[400px] rounded-l-lg overflow-hidden">
						<iframe
						src={
							selectedBranch.mapEmbed
							? selectedBranch.mapEmbed
							: `https://maps.google.com/maps?q=${encodeURIComponent(
								selectedBranch.address
								)}&output=embed`
						}
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						></iframe>
					</div>
					{/* 詳細資訊卡 */}
					<div className="p-0 border-0 ">
						<div className="flex px-6 md:px-10 lg:pl-20 py-8 lg:py-10 gap-2 text-[#375978]">
							<Building2 className="lg:mt-1 " />
							<div className="text-lg lg:text-2xl font-semibold ">{selectedBranch.name}</div>
						</div>
						{selectedBranch.content && <p className="mx-6 md:mx-10 lg:mx-20 text-base lg:text-lg font-bold text-gray-600"> {selectedBranch.content}</p>}
						<div className="space-y-3 px-6 md:px-8 lg:px-20 my-6 lg:my-10">
							<div className="flex gap-2 space-y-2 hover:scale-105 transition-transform duration-600">
								<Phone className="w-5 h-5 lg:mt-0.5" />
								<p className="text-sm lg:text-base"><strong>{t("locations.Phone")} :</strong> {selectedBranch.phone}</p>
							</div>
							<div className="flex gap-2 space-y-2 hover:scale-105 transition-transform duration-600">
								<Mail className="w-5 h-5 lg:mt-0.5" />
								<p className="text-sm lg:text-base"><strong>{t("locations.Email")} :</strong> {selectedBranch.mail}</p>
							</div>
							<div className="flex gap-2 space-y-2 hover:scale-105 transition-transform duration-600">
								<MapPinned className="w-5 h-5 lg:mt-0.5" />
								<p className="text-sm lg:text-base"><strong>{t("locations.Address")} :</strong> {selectedBranch.address}</p>
							</div>
							<div className="flex gap-2 space-y-2 hover:scale-105 transition-transform duration-600">
								<Clock className="w-5 h-5 lg:mt-0.5" />
								<p className="text-sm lg:text-base"><strong>{t("locations.BusinessHours")} :</strong> {t("locations.businessHours")}</p>
							</div>
						</div>
						<p className="md:text-right px-6 md:px-3 pb-4 md:pb-0 text-sm">{t("locations.ContactUs")}</p>
					</div>
				</div>
			)}
		</div>
	);
}
