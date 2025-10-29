import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X, Mail, MapPin, Clock, Award, Paperclip } from "lucide-react";
import { useTranslations } from "next-intl";


export default function USRecruitPanelM() {
    const t = useTranslations("Recruitment"); // Placeholder for translation function if needed
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const JOBS = [
        {
            id: "job-001",
            title: t("Job-Types.job1"),
            location: t("Job-Types.job1-location"),
            time: t("Job-Types.job1-time"),
            description: [
            t("Job-Types.job1-description1"),
            t("Job-Types.job1-description2"),
            t("Job-Types.job1-description3"),
            t("Job-Types.job1-description4")
            ],
            requirements: [
            t("Job-Types.job1-requirement1"),
            t("Job-Types.job1-requirement2"),
            t("Job-Types.job1-requirement3")
            ],
            tags: [t("Job-Types.job1-tag1"), t("Job-Types.job1-tag2")]
        },

        {
            id: "job-002",
            title: t("Job-Types.job2"),
            location: t("Job-Types.job2-location"),
            time: t("Job-Types.job2-time"),
            description: [
            t("Job-Types.job2-description1"),
            t("Job-Types.job2-description2"),
            t("Job-Types.job2-description3"),
            t("Job-Types.job2-description4")
            ],
            requirements: [
            t("Job-Types.job2-requirement1"),
            t("Job-Types.job2-requirement2"),
            t("Job-Types.job2-requirement3"),
            t("Job-Types.job2-requirement4")
            ],
            tags: [t("Job-Types.job2-tag1"), t("Job-Types.job2-tag2")]
        },

        {
            id: "job-003",
            title: t("Job-Types.job3"),
            location: t("Job-Types.job3-location"),
            time: t("Job-Types.job3-time"),
            description: [
            t("Job-Types.job3-description1"),
            t("Job-Types.job3-description2"),
            t("Job-Types.job3-description3")
            ],
            requirements: [
            t("Job-Types.job3-requirement1"),
            t("Job-Types.job3-requirement2"),
            t("Job-Types.job3-requirement3"),
            t("Job-Types.job3-requirement4")
            ],
            tags: []
            // tags: [t("Job-Types.job3-tag1"), t("Job-Types.job3-tag2")]
        },

        {
            id: "job-004",
            title: t("Job-Types.job4"),
            location: t("Job-Types.job4-location"),
            time: t("Job-Types.job4-time"),
            description: [
            t("Job-Types.job4-description1"),
            t("Job-Types.job4-description2"),
            t("Job-Types.job4-description3"),
            t("Job-Types.job4-description4")
            ],
            requirements: [
            t("Job-Types.job4-requirement1"),
            t("Job-Types.job4-requirement2"),
            t("Job-Types.job4-requirement3")
            ],
            tags: [t("Job-Types.job4-tag1")]
        },

        {
            id: "job-005",
            title: t("Job-Types.job5"),
            location: t("Job-Types.job5-location"),
            time: t("Job-Types.job5-time"),
            description: [
            t("Job-Types.job5-description1"),
            t("Job-Types.job5-description2"),
            t("Job-Types.job5-description3"),
            t("Job-Types.job5-description4")
            ],
            requirements: [
            t("Job-Types.job5-requirement1"),
            t("Job-Types.job5-requirement2"),
            t("Job-Types.job5-requirement3"),
            t("Job-Types.job5-requirement4")
            ],
            tags: []
            // tags: [t("Job-Types.job5-tag1"), t("Job-Types.job5-tag2")]
        },

        {
            id: "job-006",
            title: t("Job-Types.job6"),
            location: t("Job-Types.job6-location"),
            time: t("Job-Types.job6-time"),
            description: [
            t("Job-Types.job6-description1"),
            t("Job-Types.job6-description2"),
            t("Job-Types.job6-description3")
            ],
            requirements: [
            t("Job-Types.job6-requirement1"),
            t("Job-Types.job6-requirement2"),
            t("Job-Types.job6-requirement3"),
            t("Job-Types.job6-requirement4"),
            t("Job-Types.job6-requirement5")
            ],
            // tags: [t("Job-Types.job6-tag1")]
            tags: []
        },

        {
            id: "job-007",
            title: t("Job-Types.job7"),
            location: t("Job-Types.job7-location"),
            time: t("Job-Types.job7-time"),
            description: [
            t("Job-Types.job7-description1"),
            t("Job-Types.job7-description2"),
            t("Job-Types.job7-description3")
            ],
            requirements: [
            t("Job-Types.job7-requirement1"),
            t("Job-Types.job7-requirement2"),
            t("Job-Types.job7-requirement3"),
            t("Job-Types.job7-requirement4"),
            t("Job-Types.job7-requirement5")
            ],
            // tags: [t("Job-Types.job7-tag1")]
            tags: []
        },

        {
            id: "job-008",
            title: t("Job-Types.job8"),
            location: t("Job-Types.job8-location"),
            time: t("Job-Types.job8-time"),
            description: [
            t("Job-Types.job8-description1"),
            t("Job-Types.job8-description2"),
            t("Job-Types.job8-description3"),
            t("Job-Types.job8-description4")
            ],
            requirements: [
            t("Job-Types.job8-requirement1"),
            t("Job-Types.job8-requirement2"),
            t("Job-Types.job8-requirement3"),
            t("Job-Types.job8-requirement4")
            ],
            // tags: [t("Job-Types.job8-tag1"), t("Job-Types.job8-tag2")]
            tags: []
        }
    ];

    // Tag list from jobs
        const tags = useMemo(() => {
        const s = new Set<string>();
        JOBS.forEach((j) => j.tags.forEach((t) => s.add(t)));
        return Array.from(s) as string[];
        }, []);

    // Filter logic: title, description, requirements, tags
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return JOBS.filter((job) => {
        if (activeTag && !job.tags.includes(activeTag)) return false;
        if (!q) return true;
        const hay = [job.title, job.location, job.time]
            .concat(job.description)
            .concat(job.requirements)
            .join(" ")
            .toLowerCase();
        return hay.includes(q);
        });
    }, [query, activeTag]);

    return (
        <div className="mx-auto my-8">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-[#375978] p-4 md:p-8 ml-4 ">{t("Job-title")}</h1>

                <div className="flex gap-2 items-center w-full md:w-auto mr-16">
                    <div className="relative flex-1 mx-10 sm:mx-16 md:mx-0 md:flex-none">
                        <input
                        aria-label="搜尋職缺"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t("search")}
                        className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9ed0db]"
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        {query && (
                        <button
                            onClick={() => setQuery("")}
                            aria-label="清除搜尋"
                            className="absolute right-2 top-2.5 p-1 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                        )}
                    </div>

                    <button
                        onClick={() => {
                        setQuery("");
                        setActiveTag(null);
                        }}
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-gray-50"
                    >
                        {t("reset")}
                    </button>
                </div>
            </header>

            <main className="mt-6 mx-10 md:mx-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 左側大卡片 */}
                <section className=" md:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-75 bg-gray-100 flex items-center justify-center">
                    <Image
                    src="/about/location/YAHO_USA.jpg"
                    alt="USA Job Info"
                    fill
                    sizes="(min-width: 768px) 100vw, 100vw"
                    style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-[#115e7a] mb-6">{t("information")}</h2>
                    <dl className="grid gap-4">
                        <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 mt-1" />
                            <div>
                                <dt className="text-lg font-medium">{t("work-time")}</dt>
                                <dd className="ml-1 mt-1 text-base text-gray-600">{t("work-time-description")}</dd>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 mt-1" />
                            <div>
                                <dt className="text-lg font-medium">{t("location")}</dt>
                                <dd className="ml-1 mt-1 text-base text-gray-600">{t("location-description")}</dd>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Paperclip className="w-5 h-5 mt-1" />
                            <div>
                                <dt className="text-lg font-medium">{t("condition")}</dt>
                                <dd className="text-base text-gray-600 mt-1">
                                    <ul className="list-disc ml-5 space-y-1">
                                        <li>{t("condition-description1")}</li>
                                        {/* <li>{t("condition-description2")}</li> */}
                                    </ul>
                                </dd>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Award className="w-5 h-5 mt-1" />
                            <div>
                                <dt className="text-lg font-medium">{t("bonus")}</dt>
                                <dd className="text-base text-gray-600 mt-1">
                                    <ul className="list-disc ml-5 space-y-1">
                                        <li>{t("bonus-description1")}</li>
                                        <li>{t("bonus-description2")}</li>
                                        <li>{t("bonus-description3")}</li>
                                    </ul>
                                </dd>
                            </div>
                        </div>

                        <div className="pt-2 border-t mt-2">
                            <p className="text-base mt-4">{t("apply-email")}</p>
                            <div className="mt-2 flex gap-2 items-center text-base text-[#0f5d6f]">
                            <Mail className="w-4 h-4" />
                            <div className="flex flex-col">
                                <span>sharon88@zcstcl.com / serenaw@zcstcl.com</span>
                                <span></span>
                            </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{t("apply-email-description1")}</p>
                            <p className="text-sm text-gray-500 mt-2">{t("apply-email-description2")}</p>
                        </div>
                    </dl>
                </div>
                </section>

                {/* 右側職缺列表 */}
                <section className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                        <span className="text-sm text-gray-500 mr-2 self-center">{t("filter-label")}</span>
                        {tags.map((t) => (
                            <button
                            key={t}
                            onClick={() => setActiveTag(activeTag === t ? null : t)}
                            className={`px-3 py-1 rounded-full border text-base transition-all whitespace-nowrap ${
                                activeTag === t
                                ? "bg-[#115e7a] text-white border-transparent"
                                : "bg-white text-gray-700"
                            }`}
                            >
                            {t}
                            </button>
                        ))}
                        </div>

                        <div className="text-base text-gray-500">共 {filtered.length} {t("job-count")}</div>
                    </div>

                    {filtered.length === 0 && (
                        <div className="p-6 bg-yellow-50 border rounded-lg">{t("no-results")}</div>
                    )}

                    <div className="grid gap-4">
                        {filtered.map((job) => (
                        <article key={job.id} className="border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-[#0f5670]">{job.title}</h3>
                                    <div className="my-2 text-sm text-gray-500">{job.location}</div>
                                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold">{t("job-description")}</h4>
                                            <ul className="list-disc ml-5 mt-2 text-base space-y-1">
                                            {job.description.map((d, i) => (
                                                <li key={i}>{d}</li>
                                            ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold">{t("job-requirements")}</h4>
                                            <ul className="list-disc ml-5 mt-2 text-base space-y-1">
                                            {job.requirements.map((r, i) => (
                                                <li key={i}>{r}</li>
                                            ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 flex flex-col gap-2 items-end md:items-center">
                                    <div className="flex gap-2 flex-wrap justify-end">
                                    {job.tags.map((tg) => (
                                        <span key={tg} className="text-sm px-2 py-1 border rounded-full">{tg}</span>
                                    ))}
                                    </div>
                                    {/* <a
                                    href={`mailto:sharon88@zcstcl.com?subject=應徵 ${encodeURIComponent(job.title)}`}
                                    className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#115e7a] text-white text-sm"
                                    >
                                    {t("Apply-now")}
                                    </a> */}
                                </div>
                            </div>
                        </article>
                        ))}
                    </div>
                    

                    <footer className="mt-6 text-base text-gray-600">{t("contact")} sharon88@zcstcl.com / serenaw@zcstcl.com</footer>
                </section>
            </main>
        </div>
    );
}
