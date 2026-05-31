"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apps, searchApps, getFirstMatch, App } from "@/data/apps";
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<App[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setResults(searchApps(val));
  }, []);

  const handleSelect = useCallback(
    (app: App) => {
      setFocused(false);
      router.push(app.route);
    },
    [router]
  );

  const handleSearch = useCallback(() => {
    const match = getFirstMatch(query);
    if (match) router.push(match.route);
  }, [query, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSearch();
      if (e.key === "Escape") {
        setFocused(false);
        inputRef.current?.blur();
      }
    },
    [handleSearch]
  );

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div className="w-full max-w-[584px] relative">
      <div
        className={`
          flex items-center gap-2 px-4 py-3 rounded-full border bg-white
          transition-all duration-200
          ${
            focused
              ? "border-transparent shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] rounded-b-none"
              : "border-[#dfe1e5] shadow-sm hover:shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] hover:border-transparent"
          }
          ${showDropdown ? "rounded-b-none" : ""}
        `}
      >
        {/* Plus / Add shortcut icon */}
        <button
          className="text-gray-500 hover:text-gray-700 transition-colors shrink-0"
          aria-label="Thêm phím tắt"
          tabIndex={-1}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1Z" />
          </svg>
        </button>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="flex-1 outline-none text-base text-gray-800 bg-transparent placeholder:text-gray-500 min-w-0"
          placeholder=""
          autoComplete="off"
          spellCheck={false}
          aria-label="Tìm kiếm"
        />

        {/* Right icons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Keyboard */}
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            tabIndex={-1}
            aria-label="Bàn phím ảo"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 12H4V7h16v10ZM7 9h2v2H7V9Zm4 0h2v2h-2V9Zm4 0h2v2h-2V9ZM5 13h4v2H5v-2Zm6 0h8v2h-8v-2Z" />
            </svg>
          </button>

          {/* Mic */}
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            tabIndex={-1}
            aria-label="Tìm kiếm bằng giọng nói"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3Zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5Zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2Z" />
            </svg>
          </button>

          {/* Camera / Lens */}
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            tabIndex={-1}
            aria-label="Tìm kiếm bằng hình ảnh"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5 6.5 8 5H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1h-5.17L13.5 5.5l-1.41-1.41L10.5 5.5 9.5 6.5ZM12 17c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4Zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
            </svg>
          </button>

          {/* AI Mode button */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dadce0] text-sm text-gray-700 hover:bg-gray-50 hover:border-[#c6c9cf] transition-all shrink-0"
            tabIndex={-1}
            aria-label="Chế độ AI"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z" stroke="#1a73e8" strokeWidth="1.5" strokeLinejoin="round" fill="#1a73e8" fillOpacity="0.2"/>
            </svg>
            <span>Chế độ AI</span>
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showDropdown && (
        <SearchSuggestions
          results={results}
          query={query}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
