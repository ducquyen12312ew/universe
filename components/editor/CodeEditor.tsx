"use client";

import { useRef } from "react";
import { latexLines } from "@/data/editorContent";

const START_LINE = 812;

function highlightLatex(raw: string): string {
  if (!raw.trim()) return "&nbsp;";

  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comment lines
  if (escaped.trimStart().startsWith("%")) {
    return `<span style="color:#6a9955">${escaped}</span>`;
  }

  return escaped
    // LaTeX commands: \command
    .replace(
      /(\\[a-zA-Z_]+\*?)/g,
      '<span style="color:#569cd6">$1</span>'
    )
    // Braces: { and }
    .replace(/(\{)/g, '<span style="color:#ffd700">$1</span>')
    .replace(/(\})/g, '<span style="color:#ffd700">$1</span>')
    // Inline comments at end of line
    .replace(
      /(<span[^>]*>[^<]*<\/span>|[^%])(%[^$]*)$/,
      (_, before, comment) =>
        `${before}<span style="color:#6a9955">${comment}</span>`
    );
}

export default function CodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex flex-col h-full overflow-hidden border-r"
      style={{ backgroundColor: "#1e1e2e", borderColor: "#2d3d56", flex: "1 1 0" }}
    >
      {/* Editor tabs + breadcrumb */}
      <div
        className="flex items-center border-b shrink-0"
        style={{ borderColor: "#2d3d56", backgroundColor: "#252535" }}
      >
        {/* Tabs */}
        <div className="flex items-center">
          <button
            className="px-4 py-2 text-xs font-medium text-white border-b-2 border-green-500"
            style={{ backgroundColor: "#1e1e2e" }}
          >
            Code Editor
          </button>
          <button className="px-4 py-2 text-xs text-gray-400 hover:text-white transition-colors">
            Visual Editor
          </button>
        </div>

        {/* Toolbar icons */}
        <div className="flex items-center gap-1 px-3 ml-2 border-l" style={{ borderColor: "#2d3d56" }}>
          {["↺", "↻", "A↕"].map((icon, i) => (
            <button
              key={i}
              className="w-6 h-6 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors flex items-center justify-center"
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search / edit */}
        <div className="flex items-center gap-1 px-3">
          <button className="w-6 h-6 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors flex items-center justify-center">
            🔍
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div
        className="flex items-center gap-1 px-4 py-1.5 text-xs border-b shrink-0"
        style={{ borderColor: "#2d3d56", backgroundColor: "#1e2536", color: "#7a8a9e" }}
      >
        <span>main.tex</span>
        <span>›</span>
        <span>CÔNG NGHỆ VÀ KIẾN TRÚC HỆ THỐNG</span>
        <span>›</span>
        <span className="text-green-400">Kiến trúc hệ thống</span>

        <div className="flex-1" />
        <button className="text-gray-500 hover:text-gray-300 transition-colors text-[11px]">
          ✏ Editing
        </button>
      </div>

      {/* Code area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto code-scroll"
        style={{ backgroundColor: "#1e1e2e" }}
      >
        <div className="flex min-w-max">
          {/* Line numbers */}
          <div
            className="select-none text-right pr-4 pl-3 py-3 shrink-0 text-xs leading-5"
            style={{ color: "#4a5568", backgroundColor: "#1a1a2a", minWidth: 52 }}
          >
            {latexLines.map((_, i) => (
              <div key={i} style={{ lineHeight: "20px" }}>
                {START_LINE + i}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="py-3 pr-6 pl-3 text-xs leading-5 font-mono" style={{ color: "#d4d4d4" }}>
            {latexLines.map((line, i) => (
              <div
                key={i}
                style={{ lineHeight: "20px", minHeight: 20 }}
                dangerouslySetInnerHTML={{ __html: highlightLatex(line) }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Find/Replace bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-t shrink-0 text-xs"
        style={{ borderColor: "#2d3d56", backgroundColor: "#1a1a2a" }}
      >
        <span className="text-gray-500">mô hình luồng</span>
        <div className="flex items-center gap-1 ml-2">
          <button className="px-1.5 py-0.5 text-gray-500 border border-gray-700 rounded hover:border-gray-500 transition-colors">
            Aa
          </button>
          <button className="px-1.5 py-0.5 text-gray-500 border border-gray-700 rounded hover:border-gray-500 transition-colors">
            [*]
          </button>
          <button className="px-1.5 py-0.5 text-gray-500 border border-gray-700 rounded hover:border-gray-500 transition-colors">
            W
          </button>
          <button className="px-1.5 py-0.5 text-gray-500 border border-gray-700 rounded hover:border-gray-500 transition-colors">
            ≡
          </button>
        </div>
        <div className="flex-1" />
        <span className="text-gray-600">↑</span>
        <span className="text-gray-600">↓</span>
        <span className="text-gray-600 ml-2">0 of 0</span>
        <input
          type="text"
          placeholder="Replace with"
          className="ml-4 bg-transparent border border-gray-700 rounded px-2 py-0.5 text-gray-400 outline-none w-36 placeholder:text-gray-600"
        />
        <button className="px-2 py-0.5 text-gray-400 border border-gray-700 rounded hover:border-gray-500 hover:text-white transition-colors">
          Replace
        </button>
        <button className="px-2 py-0.5 text-gray-400 border border-gray-700 rounded hover:border-gray-500 hover:text-white transition-colors">
          Replace All
        </button>
        <button className="ml-2 text-gray-500 hover:text-white transition-colors">✕</button>
      </div>
    </div>
  );
}
