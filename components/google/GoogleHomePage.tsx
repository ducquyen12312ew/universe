"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { App, searchApps, getFirstMatch } from "@/data/apps";
import GoogleHeader from "./GoogleHeader";
import SearchSuggestions from "./SearchSuggestions";
import SearchButtons from "./SearchButtons";
import AppShortcuts from "./AppShortcuts";
import GoogleFooter from "./GoogleFooter";

function MainSearchBar({ onQueryChange }: { onQueryChange: (q: string) => void }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<App[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      setResults(searchApps(val));
      onQueryChange(val);
    },
    [onQueryChange]
  );

  const navigate = useCallback(
    (q: string) => {
      const match = getFirstMatch(q);
      if (match) router.push(match.route);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") navigate(query);
    if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (app: App) => {
    setFocused(false);
    router.push(app.route);
  };

  const showDropdown = focused && query.trim().length > 0 && results.length > 0;

  return (
    <div className="w-full max-w-[584px] relative">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-full border bg-white transition-all duration-200 ${
          showDropdown
            ? "border-transparent shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] rounded-b-none"
            : focused
            ? "border-transparent shadow-[0_1px_6px_0_rgba(32,33,36,0.28)]"
            : "border-[#dfe1e5] shadow-sm hover:shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] hover:border-transparent"
        }`}
      >
        {/* Plus icon */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0" tabIndex={-1}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1Z" />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="flex-1 outline-none text-base text-gray-800 bg-transparent min-w-0"
          autoComplete="off"
          spellCheck={false}
          aria-label="Tìm kiếm"
        />

        <div className="flex items-center gap-3 shrink-0">
          {/* Keyboard icon */}
          <button className="text-gray-500 hover:text-gray-700 transition-colors" tabIndex={-1}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 12H4V7h16v10ZM7 9h2v2H7V9Zm4 0h2v2h-2V9Zm4 0h2v2h-2V9ZM5 13h4v2H5v-2Zm6 0h8v2h-8v-2Z" />
            </svg>
          </button>
          {/* Mic icon */}
          <button className="text-gray-500 hover:text-gray-700 transition-colors" tabIndex={-1}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3Zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5Zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2Z" />
            </svg>
          </button>
          {/* Camera icon */}
          <button className="text-gray-500 hover:text-gray-700 transition-colors" tabIndex={-1}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
              <path d="M9 3 7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9Zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z" />
            </svg>
          </button>
          {/* AI mode button */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dadce0] text-sm text-gray-700 hover:bg-gray-50 hover:border-[#c6c9cf] transition-all shrink-0"
            tabIndex={-1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z"
                stroke="#1a73e8"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="#1a73e8"
                fillOpacity="0.2"
              />
            </svg>
            <span>Chế độ AI</span>
          </button>
        </div>
      </div>

      {showDropdown && (
        <SearchSuggestions results={results} query={query} onSelect={handleSelect} />
      )}
    </div>
  );
}

export default function GoogleHomePage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GoogleHeader />

      <main className="flex-1 flex flex-col items-center justify-center pb-28 px-4">
        {/* Google Logo */}
        <div className="mb-7">
          <img
            src="/image/google.png"
            alt="Google"
            width={272}
            height={92}
            className="object-contain"
          />
        </div>

        {/* Search bar */}
        <MainSearchBar onQueryChange={setQuery} />

        {/* Action buttons */}
        <SearchButtons query={query} />

        {/* Language support */}
        <p className="mt-6 text-sm text-[#3c4043]">
          Google hỗ trợ các ngôn ngữ:{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1a0dab] hover:underline">
            English
          </a>{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1a0dab] hover:underline">
            Français
          </a>{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1a0dab] hover:underline">
            繁體中文
          </a>
        </p>

        {/* App shortcuts */}
        <AppShortcuts />
      </main>

      <GoogleFooter />
    </div>
  );
}
