"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { overleafProjects, OverleafProject } from "@/data/overleafProjects";
import { isPremium, getPremiumDate, getPremiumPlan } from "@/lib/demoState";

function ActionIcons() {
  return (
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-gray-400 hover:text-white transition-colors" title="Copy">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1Zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 16H8V7h11v14Z" />
        </svg>
      </button>
      <button className="text-gray-400 hover:text-white transition-colors" title="Download">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7ZM5 18v2h14v-2H5Z" />
        </svg>
      </button>
      <button className="text-gray-400 hover:text-white transition-colors" title="Archive">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.54 5.23L19.15 3.55C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27ZM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5ZM5.12 5l.82-1h12l.93 1H5.12Z" />
        </svg>
      </button>
      <button className="text-gray-400 hover:text-white transition-colors" title="Share">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92Z" />
        </svg>
      </button>
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

function PremiumBanner({ plan, date }: { plan: string; date: string }) {
  return (
    <div
      className="mx-6 mt-4 mb-2 rounded-xl px-5 py-4 flex items-center gap-4 shrink-0"
      style={{
        background: "linear-gradient(135deg, rgba(76,175,80,0.15) 0%, rgba(29,97,49,0.25) 100%)",
        border: "1px solid rgba(76,175,80,0.35)",
        boxShadow: "0 0 20px rgba(76,175,80,0.08)",
      }}
    >
      {/* Star icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg,#4caf50,#1d6131)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-white font-bold text-sm">Overleaf {plan} — Premium Activated</span>
          <span
            className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider"
            style={{ backgroundColor: "#4caf50", color: "#fff" }}
          >
            PRO
          </span>
          <span
            className="px-2 py-0.5 text-[10px] font-medium rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#a3e4a8" }}
          >
            Activated via OCB
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 14.5v-9l6 4.5-6 4.5Z" />
            </svg>
            PRO Member
          </span>
          <span>•</span>
          <span>Kích hoạt: {date}</span>
          <span>•</span>
          <span className="text-green-400">● Active</span>
        </div>
      </div>

      {/* Right badge */}
      <div
        className="hidden sm:flex flex-col items-end shrink-0"
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(76,175,80,0.2)", border: "1px solid rgba(76,175,80,0.3)" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#4caf50">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
          </svg>
          <span className="text-xs font-semibold text-green-400">Upgrade Complete</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pro, setPro] = useState(false);
  const [premiumDate, setPremiumDate] = useState("");
  const [premiumPlan, setPremiumPlan] = useState("Standard");
  const router = useRouter();

  useEffect(() => {
    const refresh = () => {
      setPro(isPremium());
      setPremiumDate(getPremiumDate());
      setPremiumPlan(getPremiumPlan());
    };
    refresh();
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
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
    <div
      className="flex flex-col h-full overflow-hidden transition-all duration-500"
      style={{ backgroundColor: pro ? "#1e2d42" : "#243044" }}
    >
      {/* Pro banner */}
      {pro && <PremiumBanner plan={premiumPlan} date={premiumDate} />}

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0 border-b"
        style={{ borderColor: pro ? "rgba(76,175,80,0.2)" : "#2d3d56" }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-white">All projects</h1>
          {pro && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold"
              style={{
                background: "linear-gradient(90deg,#4caf50,#1d6131)",
                color: "#fff",
                boxShadow: "0 0 8px rgba(76,175,80,0.4)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z" />
              </svg>
              PREMIUM
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {pro ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                Plan:{" "}
                <span className="font-semibold" style={{ color: "#4caf50" }}>
                  {premiumPlan}
                </span>
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

          {!pro && (
            <button
              onClick={() => router.push("/apps/overleaf/upgrade")}
              className="px-4 py-1.5 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#4caf50", boxShadow: "0 2px 8px rgba(76,175,80,0.3)" }}
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
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-colors"
          style={{
            backgroundColor: "#1a2535",
            borderColor: pro ? "rgba(76,175,80,0.25)" : "#2d3d56",
          }}
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
          <thead
            className="sticky top-0"
            style={{ backgroundColor: pro ? "#1e2d42" : "#243044" }}
          >
            <tr
              className="border-b"
              style={{ borderColor: pro ? "rgba(76,175,80,0.2)" : "#2d3d56" }}
            >
              <th className="w-8 py-3 text-left">
                <input type="checkbox" className="accent-green-500 cursor-pointer" onChange={() => {}} />
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
                style={{ borderColor: pro ? "rgba(76,175,80,0.1)" : "#2d3d56" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = pro
                    ? "rgba(76,175,80,0.05)"
                    : "rgba(255,255,255,0.03)")
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
                    {pro && project.id === "datn-phan-duc-quyen" && (
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                        style={{ backgroundColor: "rgba(76,175,80,0.2)", color: "#4caf50" }}
                      >
                        PRO
                      </span>
                    )}
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
