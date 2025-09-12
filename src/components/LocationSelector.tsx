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

// const countries = ["Taiwan", "Japan", "USA", "Germany", "Singapore"];
const countries = ["Taiwan", "USA"];

// const embedMap: Record<string, string> = {
//   	"Taiwan-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.1751899851147!2d120.68961027512995!3d24.20064317836592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469179eff25048b%3A0xca382336ec6075f!2zNDA25Y-w54Gj5Y-w5Lit5biC5YyX5bGv5Y2A55Kw5Lit6Lev5LiA5q61NDg16Jmf!5e0!3m2!1szh-TW!2sus!4v1754533882444!5m2!1szh-TW!2sus",
//   	"Taiwan-2": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.5855686693476!2d120.99003997604417!3d24.741104350021875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346849868f83bb87%3A0x374a19df73dd9eac!2zMzA45paw56u557ij5a-25bGx6YSJ5bWp57-g6LevMTAz5be3NTjomZ8!5e0!3m2!1szh-TW!2stw!4v1756276333082!5m2!1szh-TW!2stw",
//   	"Taiwan-3": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.379998244364!2d121.00839007604529!3d24.78243834837396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34683622ac0e8837%3A0x206e639fecde14e!2zMzAw5paw56u55biC5p2x5Y2A56eR5a245ZyS6LevMTYy5be3M-W8hDLomZ8!5e0!3m2!1szh-TW!2stw!4v1756276457234!5m2!1szh-TW!2stw",
//   	"Taiwan-4": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.162144848472!2d120.25546997601018!3d23.127747812393693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e7be4916c95d5%3A0x8a6064d625f7f8a0!2zNzQ15Y-w5Y2X5biC5a6J5a6a5Y2AMi0xNA!5e0!3m2!1szh-TW!2stw!4v1756276526789!5m2!1szh-TW!2stw",
// 	"Taiwan-5": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.589153458087!2d120.34677797600233!3d22.743507126683394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e11d0cd5027bb%3A0x819994a86922584e!2zODE16auY6ZuE5biC5aSn56S-5Y2A5Lit5q2j6LevMzI5LTPomZ8!5e0!3m2!1szh-TW!2stw!4v1756276632022!5m2!1szh-TW!2stw",

//   	"USA-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.7590289179345!2d-118.24368468478408!3d34.05223548060667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7bce472b0fb%3A0x5562a441bdd2bb1f!2zTG9zIEFuZ2VsZXMsIENBLCBVU0E!5e0!3m2!1sen!2sus!4v1690000000004",

//   	"Japan-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.844535936671!2d135.49720481548952!3d34.70248558043142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e0e84e12f321%3A0x84fbd0e7e4f97a0d!2zT3NhY2EsIEphcGFu!5e0!3m2!1sja!2sjp!4v1690000000006",

//   	"Germany-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2426.463088706809!2d13.411776577012185!3d52.543147834515125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a852003417ca55%3A0x282c62d383406b6d!2zUGFwcGVsYWxsZWUgNzgvNzksIDEwNDM3IEJlcmxpbiwg5b635ZyL!5e0!3m2!1szh-TW!2stw!4v1756272381235!5m2!1szh-TW!2stw",

//   	"Singapore-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.72979086235!2d103.90321457581662!3d1.3384157616107366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da17e45292fb61%3A0x53f09ab2bb91b45!2s8%20Kaki%20Bukit%20Ave%204%2C%20Singapore%20415875!5e0!3m2!1szh-TW!2stw!4v1756273319284!5m2!1szh-TW!2stw"
// };
const embedMap: Record<string, string> = {
  	"Taiwan-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.1751899851147!2d120.68961027512995!3d24.20064317836592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469179eff25048b%3A0xca382336ec6075f!2zNDA25Y-w54Gj5Y-w5Lit5biC5YyX5bGv5Y2A55Kw5Lit6Lev5LiA5q61NDg16Jmf!5e0!3m2!1szh-TW!2sus!4v1754533882444!5m2!1szh-TW!2sus",
  	"Taiwan-2": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.5855686693476!2d120.99003997604417!3d24.741104350021875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346849868f83bb87%3A0x374a19df73dd9eac!2zMzA45paw56u557ij5a-25bGx6YSJ5bWp57-g6LevMTAz5be3NTjomZ8!5e0!3m2!1szh-TW!2stw!4v1756276333082!5m2!1szh-TW!2stw",
  	"Taiwan-3": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.379998244364!2d121.00839007604529!3d24.78243834837396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34683622ac0e8837%3A0x206e639fecde14e!2zMzAw5paw56u55biC5p2x5Y2A56eR5a245ZyS6LevMTYy5be3M-W8hDLomZ8!5e0!3m2!1szh-TW!2stw!4v1756276457234!5m2!1szh-TW!2stw",
  	"Taiwan-4": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.162144848472!2d120.25546997601018!3d23.127747812393693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e7be4916c95d5%3A0x8a6064d625f7f8a0!2zNzQ15Y-w5Y2X5biC5a6J5a6a5Y2AMi0xNA!5e0!3m2!1szh-TW!2stw!4v1756276526789!5m2!1szh-TW!2stw",
	"Taiwan-5": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.589153458087!2d120.34677797600233!3d22.743507126683394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e11d0cd5027bb%3A0x819994a86922584e!2zODE16auY6ZuE5biC5aSn56S-5Y2A5Lit5q2j6LevMzI5LTPomZ8!5e0!3m2!1szh-TW!2stw!4v1756276632022!5m2!1szh-TW!2stw",

  	"USA-1": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.7590289179345!2d-118.24368468478408!3d34.05223548060667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7bce472b0fb%3A0x5562a441bdd2bb1f!2zTG9zIEFuZ2VsZXMsIENBLCBVU0E!5e0!3m2!1sen!2sus!4v1690000000004"
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
			imageUrl: `/about/location/YAHO_${t(`locations.country.${country}.name`)}.jpg`, // 你可以自訂這邊邏輯
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
	(b) => b.country === "Taiwan" && b.name.includes(t("locations.country.Taiwan.taichung"))
	);

  	const [selectedBranch, setSelectedBranch] = useState<BranchData | null>(defaultBranch ?? null);

	const filteredBranches = selectedCountry && selectedCountry !== "All"
		? allBranches.filter((b) => b.country === selectedCountry)
		: allBranches;

	return (
		<div className="p-6 space-y-8">
			<div className="flex space-y-8">
				{/* 國家選單 */}
				<Select
					onValueChange={(value) => {
					setSelectedCountry(value);

					if (value === "All") {
						const fallback = allBranches.find(
						(b) =>
							b.country === "Taiwan" &&
							b.name.includes(t("locations.country.Taiwan.taichung"))
						);
						setSelectedBranch(fallback ?? null);
					} else {
						const firstBranchOfCountry = allBranches.find(
						(b) => b.country === value
						);
						setSelectedBranch(firstBranchOfCountry ?? null);
					}
					}}
				>
					<SelectTrigger className="w-[200px] mx-5">
					<SelectValue placeholder="Select a country" />
					</SelectTrigger>
					<SelectContent>
					<SelectItem value="All">All</SelectItem>
					{countries.map((c) => (
						<SelectItem key={c} value={c}>
						{c}
						</SelectItem>
					))}
					</SelectContent>
				</Select>

				{/* branch 選單（依照目前選到的國家過濾） */}
				<Select value={selectedBranch?.name ?? ""}
					onValueChange={(branchName) => {
					const branch = allBranches.find((b) => b.name === branchName);
					setSelectedBranch(branch ?? null);
					}}
				>
					<SelectTrigger className="w-[300px] mx-5">
						<SelectValue placeholder="Select a branch" />
					</SelectTrigger>
					<SelectContent>
						{filteredBranches.map((branch) => (
							<SelectItem key={branch.name} value={branch.name}>
							{branch.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				
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
