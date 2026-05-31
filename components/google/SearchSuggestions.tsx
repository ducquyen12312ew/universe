"use client";

import { App } from "@/data/apps";
import { useRouter } from "next/navigation";

interface SearchSuggestionsProps {
  results: App[];
  query: string;
  onSelect: (app: App) => void;
}

export default function SearchSuggestions({ results, query, onSelect }: SearchSuggestionsProps) {
  if (!query.trim() || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-3xl shadow-lg z-50 overflow-hidden animate-slide-down mt-0 border-t-0">
      <ul className="py-2">
        {results.map((app) => (
          <li key={app.id}>
            <button
              className="w-full flex items-center gap-4 px-5 py-2.5 hover:bg-gray-50 text-left transition-colors group"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(app);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-800">{app.name}</span>
                {app.description && (
                  <span className="text-xs text-gray-500 ml-2">— {app.description}</span>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-[#1a73e8]">Mở</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a73e8">
                  <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </button>
          </li>
        ))}
        <li className="border-t border-gray-100 mt-1 pt-1">
          <div className="px-5 py-2 text-xs text-gray-400">
            Nhấn Enter để tìm kiếm · {results.length} ứng dụng phù hợp
          </div>
        </li>
      </ul>
    </div>
  );
}
