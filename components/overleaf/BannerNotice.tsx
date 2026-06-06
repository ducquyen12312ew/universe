"use client";

import { useState, useEffect } from "react";
import { isPremium } from "@/lib/demoState";

export default function BannerNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!isPremium());
    const refresh = () => setVisible(!isPremium());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="flex items-center justify-between px-4 py-3 text-sm text-white shrink-0"
      style={{ backgroundColor: "#1e3a5f", borderBottom: "1px solid #2d4d70" }}
    >
      <div className="flex items-start gap-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-blue-300 shrink-0 mt-0.5"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
        </svg>
        <p className="text-gray-200 text-xs leading-relaxed">
          Nâng cấp lên{" "}
          <span className="text-white font-semibold">Overleaf Premium</span> với{" "}
          <span className="text-blue-300 font-semibold">OCB OMNI</span> — thanh toán nhanh chóng,
          an toàn và nhận kích hoạt ngay lập tức.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-4">
        <button
          className="px-3 py-1.5 text-xs border border-white/30 rounded text-white hover:bg-white/10 transition-colors whitespace-nowrap"
          onClick={() => {}}
        >
          Tìm hiểu thêm
        </button>
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={() => setVisible(false)}
          aria-label="Đóng thông báo"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
