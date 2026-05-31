"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditorTopBar({ projectName }: { projectName: string }) {
  const router = useRouter();
  const menuItems = ["File", "Edit", "Insert", "View", "Format", "Help"];

  return (
    <header
      className="flex items-center justify-between px-3 py-1.5 shrink-0 border-b text-sm"
      style={{ backgroundColor: "#1b2638", borderColor: "#2d3d56", minHeight: 40 }}
    >
      {/* Left: Logo + menus */}
      <div className="flex items-center gap-1">
        {/* Home icon */}
        <Link
          href="/apps/overleaf"
          className="flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors text-gray-300"
          title="Về trang chủ Overleaf"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 mx-1" style={{ backgroundColor: "#2d3d56" }} />

        {/* Menu items */}
        {menuItems.map((item) => (
          <button
            key={item}
            className="px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Center: Project title */}
      <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        <button className="flex items-center gap-1.5 text-white font-medium text-sm hover:bg-white/10 px-2 py-1 rounded transition-colors">
          <span>{projectName}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5H7Z" />
          </svg>
        </button>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Clock */}
        <button className="text-gray-400 hover:text-white transition-colors" title="Lịch sử">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7v2l3.5-3.5L13 0v3Z" />
          </svg>
        </button>

        {/* Download */}
        <button className="text-gray-400 hover:text-white transition-colors" title="Tải xuống">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7ZM5 18v2h14v-2H5Z" />
          </svg>
        </button>

        {/* Share */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded transition-colors border border-green-600 hover:bg-green-900/30">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92Z" />
          </svg>
          Share
        </button>

        {/* Upgrade */}
        <button
          onClick={() => router.push("/apps/overleaf/upgrade")}
          className="px-3 py-1.5 text-xs font-semibold text-white rounded transition-colors"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
        >
          Upgrade
        </button>
      </div>
    </header>
  );
}
