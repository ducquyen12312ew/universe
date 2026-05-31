"use client";

import { useState } from "react";
import { fileTreeData, fileOutlineData, FileNode } from "@/data/fileTree";

function FileIcon({ extension }: { extension?: string }) {
  const color = extension === "tex" ? "#4caf50" : extension === "png" ? "#f59e0b" : "#7a8a9e";
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6Zm4 18H6V4h7v5h5v11Z" />
    </svg>
  );
}

function FolderIcon({ isOpen }: { isOpen?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#7a8a9e">
      {isOpen ? (
        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm0 12H4V6h5.17l2 2H20v10Z" />
      ) : (
        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm0 12H4V6h5.17l2 2H20v10Z" />
      )}
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`transition-transform duration-150 ${isOpen ? "rotate-90" : ""}`}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6Z" />
    </svg>
  );
}

function FileTreeNode({
  node,
  depth = 0,
  activeId,
  onSelect,
}: {
  node: FileNode;
  depth?: number;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(node.isOpen ?? false);

  const isActive = node.id === activeId;

  const toggle = () => {
    if (node.type === "folder") setIsOpen((v) => !v);
    else onSelect(node.id);
  };

  return (
    <div>
      <div
        onClick={toggle}
        className={`flex items-center gap-1.5 px-2 py-1 cursor-pointer text-xs rounded transition-colors ${
          isActive
            ? "text-white"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`}
        style={{
          paddingLeft: `${8 + depth * 14}px`,
          backgroundColor: isActive ? "#2d4a2d" : undefined,
        }}
      >
        {node.type === "folder" && (
          <span className="text-gray-500">
            <ChevronIcon isOpen={isOpen} />
          </span>
        )}
        {node.type === "folder" ? (
          <FolderIcon isOpen={isOpen} />
        ) : (
          <FileIcon extension={node.extension} />
        )}
        <span className={isActive ? "text-green-400 font-medium" : ""}>{node.name}</span>
      </div>

      {node.type === "folder" && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree() {
  const [activeId, setActiveId] = useState("main-tex");

  return (
    <div
      className="flex flex-col h-full overflow-hidden border-r"
      style={{ width: 240, backgroundColor: "#1e2536", borderColor: "#2d3d56" }}
    >
      {/* File tree header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b text-xs font-semibold text-gray-400 shrink-0"
        style={{ borderColor: "#2d3d56" }}
      >
        <span>File tree</span>
        <div className="flex items-center gap-2">
          {/* New file */}
          <button className="hover:text-white transition-colors" title="Tệp mới">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6ZM6 20V4h7v5h5v11H6Zm7-7h-2v-2h-2v2H7v2h2v2h2v-2h2v-2Z" />
            </svg>
          </button>
          {/* New folder */}
          <button className="hover:text-white transition-colors" title="Thư mục mới">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm0 12H4V6h5.17l2 2H20v10Zm-8-4h2v-2h2v-2h-2V8h-2v2h-2v2h2v2Z" />
            </svg>
          </button>
          {/* Upload */}
          <button className="hover:text-white transition-colors" title="Tải lên">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96ZM14 13v4h-4v-4H7l5-5 5 5h-3Z" />
            </svg>
          </button>
          {/* Close */}
          <button className="hover:text-white transition-colors" title="Đóng">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* File tree content */}
      <div className="flex-1 overflow-y-auto dark-scroll py-1 min-h-0">
        {fileTreeData.map((node) => (
          <FileTreeNode
            key={node.id}
            node={node}
            activeId={activeId}
            onSelect={setActiveId}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "#2d3d56" }} />

      {/* File outline */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b text-xs font-semibold text-gray-400 shrink-0"
        style={{ borderColor: "#2d3d56" }}
      >
        <span>File outline</span>
      </div>

      <div className="overflow-y-auto dark-scroll py-1" style={{ maxHeight: 200 }}>
        {fileOutlineData.map((item) => (
          <div
            key={item.id}
            className={`flex items-center text-xs py-1 cursor-pointer transition-colors truncate ${
              item.isActive ? "text-green-400 font-medium" : "text-gray-400 hover:text-white"
            }`}
            style={{ paddingLeft: `${8 + (item.level - 1) * 10}px`, paddingRight: 8 }}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
