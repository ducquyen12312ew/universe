"use client";

import { useState } from "react";
import Link from "next/link";

type NavItem = {
  label: string;
  key: string;
};

const navItems: NavItem[] = [
  { label: "All projects", key: "all" },
  { label: "Your projects", key: "yours" },
  { label: "Shared with you", key: "shared" },
  { label: "Archived projects", key: "archived" },
  { label: "Trashed projects", key: "trashed" },
];

const tags = [{ label: "Hjj", count: 0, color: "#4caf50" }];

export default function OverleafSidebar() {
  const [activeNav, setActiveNav] = useState("all");

  return (
    <aside
      className="flex flex-col shrink-0 w-[210px] border-r overflow-y-auto dark-scroll"
      style={{ backgroundColor: "#1a2535", borderColor: "#2d3d56" }}
    >
      {/* New Project button */}
      <div className="p-4">
        <button
          className="w-full py-2 rounded text-white text-sm font-semibold transition-colors"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
        >
          New project
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col px-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveNav(item.key)}
            className={`text-left px-3 py-2 text-sm rounded transition-colors ${
              activeNav === item.key
                ? "text-white font-semibold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            style={activeNav === item.key ? { color: "white" } : {}}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="my-4 border-t" style={{ borderColor: "#2d3d56" }} />

      {/* Tags section */}
      <div className="px-4">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Organize Tags
        </p>
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2">
          <span className="text-lg leading-none">+</span>
          <span>New tag</span>
        </button>

        {tags.map((tag) => (
          <button
            key={tag.label}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1 w-full text-left"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: tag.color }}
            />
            <span>
              {tag.label} ({tag.count})
            </span>
          </button>
        ))}

        <button className="text-sm text-gray-500 italic mt-1 hover:text-gray-300 transition-colors">
          Uncategorized (12)
        </button>
      </div>

      {/* Flex spacer */}
      <div className="flex-1" />

      {/* Affiliation */}
      <div className="p-4 border-t" style={{ borderColor: "#2d3d56" }}>
        <p className="text-xs text-gray-400 mb-2">
          Are you affiliated with an institution?
        </p>
        <button className="w-full px-3 py-1.5 text-xs text-gray-300 border border-gray-600 rounded hover:bg-white/5 hover:border-gray-400 transition-colors">
          Add affiliation
        </button>
      </div>

      {/* Bottom icons */}
      <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: "#2d3d56" }}>
        <button className="text-gray-400 hover:text-white transition-colors" title="Cài đặt">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58ZM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6Z" />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-white transition-colors" title="Tài khoản">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" />
          </svg>
        </button>
      </div>

      <div
        className="px-4 py-2 text-[10px] font-bold tracking-widest"
        style={{ color: "#4a5568" }}
      >
        DIGITAL SCIENCE
      </div>
    </aside>
  );
}
