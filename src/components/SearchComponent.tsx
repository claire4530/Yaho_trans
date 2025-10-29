"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { Search } from "lucide-react";

type IndexItem = {
    id: string;
    title: string;
    url: string;
    excerpt?: string;
    excerptDescription?: string;
    type?: string;
};

export default function SiteWideSearch({ locale = "zh" }: { locale?: string }) {
    const [query, setQuery] = useState("");
    const [indexData, setIndexData] = useState<IndexItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [highlightIdx, setHighlightIdx] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const resultsLimit = 50;

    // load index for locale
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch(`/search_index/${locale}.json`)
        .then((r) => {
            if (!r.ok) throw new Error("index not found");
            return r.json();
        })
        .then((json) => { if (mounted) setIndexData(json || []); })
        .catch(() => { if (mounted) setIndexData([]); })
        .finally(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, [locale]);

    // fuse instance
    const fuse = useMemo(() => {
        return new Fuse(indexData, {
        keys: ["title", "excerpt", "type"],
        includeScore: true,
        threshold: 0.35,
        ignoreLocation: true,
        });
    }, [indexData]);

    // debounce search
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    useEffect(() => {
        const id = setTimeout(() => setDebouncedQuery(query.trim()), 250);
        return () => clearTimeout(id);
    }, [query]);

    const results = useMemo(() => {
        if (!debouncedQuery) return [];
        const res = fuse.search(debouncedQuery, { limit: resultsLimit }).map(r => r.item);
        return res;
    }, [debouncedQuery, fuse]);

    // keyboard navigation (ArrowUp/Down, Enter, Esc)
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
        if (!open) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIdx((s) => Math.min(s + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIdx((s) => Math.max(s - 1, 0));
        } else if (e.key === "Enter") {
            if (highlightIdx >= 0 && highlightIdx < results.length) {
            window.location.href = results[highlightIdx].url;
            }
        } else if (e.key === "Escape") {
            setOpen(false);
        }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, highlightIdx, results]);

    // escape HTML for safe highlight
    function escapeHtml(str: string) {
        return str.replace(/[&<>"'`=\/]/g, (s) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
        "'": "&#39;", "`": "&#96;", "=": "&#61;", "/": "&#47;"
        }[s] || s));
    }
    function highlight(text = "", q = "") {
        if (!q) return escapeHtml(text);
        const safeQ = escapeHtml(q).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        const re = new RegExp(`(${safeQ})`, "ig");
        return escapeHtml(text).replace(re, "<mark>$1</mark>");
    }

    return (
        <div className="relative max-w-3xl mx-auto" onFocus={() => setOpen(true)}>
        <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlightIdx(-1); }}
            onFocus={() => setOpen(true)}
            onBlur={() => { /* allow click on results - don't auto close here */ }}
            placeholder={locale === "zh" ? "搜尋本站..." : "Search site..."}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none"
            aria-label="Site search"
            />
        </div>

        {/* results panel */}
        {open && (debouncedQuery || loading) && (
            <div className="absolute z-50 left-0 right-0 mt-2 bg-white border rounded-md shadow-lg">
            {loading ? (
                <div className="p-4 text-sm">Loading index…</div>
            ) : results.length === 0 ? (
                <div className="p-4 text-sm text-gray-500">No results</div>
            ) : (
                <ul role="list" className="max-h-80 overflow-auto">
                {results.map((it, i) => (
                    <li
                    key={it.id}
                    className={`p-3 flex justify-between items-start gap-4 hover:bg-gray-50 ${i === highlightIdx ? "bg-gray-100" : ""}`}
                    onMouseEnter={() => setHighlightIdx(i)}
                    onMouseLeave={() => setHighlightIdx(-1)}
                    >
                    <div className="flex-1 min-w-0">
                        <Link
                            href={it.url}
                            className="block text-base font-medium text-blue-700 break-words"
                            dangerouslySetInnerHTML={{ __html: highlight(it.title, debouncedQuery) }}
                        />
                        {it.excerptDescription && (
                        <p className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: highlight(it.excerptDescription, debouncedQuery) }} />
                        )}
                        {it.type && <div className="text-xs text-gray-400 mt-2">{it.type}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* <Link href={it.url} className="px-3 py-1 text-sm border rounded">前往</Link> */}
                        <a href={it.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-sm border rounded">新分頁</a>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            </div>
        )}
        </div>
    );
}
