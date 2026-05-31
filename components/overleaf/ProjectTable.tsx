"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { overleafProjects, OverleafProject } from "@/data/overleafProjects";

function ActionIcons() {
  return (
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      {/* Copy */}
      <button className="text-gray-400 hover:text-white transition-colors" title="Copy">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1Zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 16H8V7h11v14Z" />
        </svg>
      </button>
      {/* Download */}
      <button className="text-gray-400 hover:text-white transition-colors" title="Download">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7ZM5 18v2h14v-2H5Z" />
        </svg>
      </button>
      {/* Archive */}
      <button className="text-gray-400 hover:text-white transition-colors" title="Archive">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.54 5.23L19.15 3.55C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27ZM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5ZM5.12 5l.82-1h12l.93 1H5.12Z" />
        </svg>
      </button>
      {/* Share */}
      <button className="text-gray-400 hover:text-white transition-colors" title="Share">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92Z" />
        </svg>
      </button>
      {/* Delete */}
      <button className="text-gray-400 hover:text-red-400 transition-colors" title="Delete">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z" />
        </svg>
      </button>
    </div>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#7a8a9e">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1ZM8 13h8v-2H8v2Zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5Z" />
    </svg>
  );
}

export default function ProjectTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPro, setIsPro] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsPro(localStorage.getItem("plan") === "pro");
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "plan" && e.newValue === "pro") setIsPro(true);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filtered = useMemo(
    () =>
      overleafProjects.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRowClick = (project: OverleafProject) => {
    if (project.route) router.push(project.route);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0 border-b"
        style={{ borderColor: "#2d3d56" }}
      >
        <h1 className="text-xl font-semibold text-white">All projects</h1>
        <div className="flex items-center gap-3">
          {isPro ? (
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
                <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: "#ffd700" }}>
                Pro Plan — Premium User
              </span>
              <span className="px-2 py-0.5 text-xs font-bold text-white rounded" style={{ backgroundColor: "#4caf50" }}>
                Upgrade Complete
              </span>
            </div>
          ) : (
            <>
              <span className="text-sm text-gray-400">
                You&apos;re on the{" "}
                <span className="text-white font-medium">free plan</span>
              </span>
              <button
                className="w-4 h-4 rounded-full border border-gray-400 text-[10px] text-gray-400 flex items-center justify-center hover:border-white hover:text-white transition-colors"
                title="Info"
              >
                ?
              </button>
            </>
          )}
          {!isPro && (
            <button
              onClick={() => router.push("/apps/overleaf/upgrade")}
              className="px-4 py-1.5 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
              Upgrade
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-6 py-4 shrink-0">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded border"
          style={{ backgroundColor: "#1a2535", borderColor: "#2d3d56" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#7a8a9e">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in all projects..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto dark-scroll px-6">
        <table className="w-full text-sm">
          <thead className="sticky top-0" style={{ backgroundColor: "#243044" }}>
            <tr className="border-b" style={{ borderColor: "#2d3d56" }}>
              <th className="w-8 py-3 text-left">
                <input
                  type="checkbox"
                  className="accent-green-500 cursor-pointer"
                  onChange={() => {}}
                />
              </th>
              <th className="py-3 text-left font-semibold text-white">Title</th>
              <th className="py-3 text-left font-semibold text-white w-40">Owner</th>
              <th className="py-3 text-left font-semibold text-white w-48">
                <span className="flex items-center gap-1">
                  Last modified
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8Z" />
                  </svg>
                </span>
              </th>
              <th className="py-3 text-right font-semibold text-white w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <tr
                key={project.id}
                className="group border-b cursor-pointer transition-colors"
                style={{ borderColor: "#2d3d56" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td className="py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(project.id)}
                    onChange={() => toggleSelect(project.id)}
                    className="accent-green-500 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td
                  className="py-3 font-medium text-white hover:underline"
                  onClick={() => handleRowClick(project)}
                >
                  <span className="flex items-center gap-2">
                    {project.title}
                    {project.isLinked && <LinkIcon />}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{project.owner || "—"}</td>
                <td className="py-3 text-gray-400">{project.lastModified}</td>
                <td className="py-3 text-right">
                  <ActionIcons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-center text-sm text-gray-500 py-6">
          Showing {filtered.length} out of {overleafProjects.length} projects.
        </p>
      </div>
    </div>
  );
}
