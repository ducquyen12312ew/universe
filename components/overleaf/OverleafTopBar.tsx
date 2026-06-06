"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBalance } from "@/lib/demoState";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7ZM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27ZM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2Zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01Z" />
    </svg>
  );
}

function BalanceCard() {
  const [shown, setShown] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(getBalance());
    const handleStorage = () => setBalance(getBalance());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const formatted = balance.toLocaleString("vi-VN") + " VNĐ";

  return (
    <div
      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* OCB coin icon */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4Z" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-[9px] text-gray-400 font-medium tracking-wide uppercase">
          Số dư OCB
        </span>
        <div
          className="text-sm font-bold transition-all duration-300 overflow-hidden"
          style={{
            color: shown && balance > 0 ? "#4ade80" : "#94a3b8",
            letterSpacing: shown ? "0" : "2px",
          }}
        >
          {shown ? (balance > 0 ? formatted : "0 VNĐ") : "• • • • •"}
        </div>
      </div>

      <button
        onClick={() => setShown((v) => !v)}
        className="text-gray-400 hover:text-white transition-colors ml-0.5"
        title={shown ? "Ẩn số dư" : "Hiện số dư"}
      >
        <EyeIcon open={shown} />
      </button>
    </div>
  );
}

export default function OverleafTopBar() {
  const navLinks = ["Product", "Solutions", "Templates", "Pricing"];

  return (
    <header
      className="flex items-center justify-between px-6 py-2.5 border-b shrink-0"
      style={{ backgroundColor: "#1b2638", borderColor: "#2d3d56" }}
    >
      {/* Logo */}
      <Link href="/apps/overleaf" className="flex items-center gap-0">
        <img
          src="/image/overocb.png"
          alt="Overleaf x OCB"
          className="h-9 object-contain object-left"
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const fallback = img.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        {/* Fallback if image missing */}
        <div className="items-center gap-2 hidden">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" fill="#4caf50" />
            <path d="M8 7c0 0 2 1 2 5s-2 5-2 5M13 7c1.5 1.5 3 3 3 5s-1.5 3.5-3 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-white font-bold text-base tracking-tight" style={{ fontFamily: "serif" }}>
            Overleaf
          </span>
          <span className="text-gray-400 text-sm font-light mx-1">×</span>
          <span className="text-white font-bold text-base tracking-tight">OCB</span>
        </div>
      </Link>

      {/* Center: Balance card */}
      <div className="flex items-center">
        <BalanceCard />
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-5">
        {navLinks.map((link) => (
          <button
            key={link}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
          >
            {link}
            {(link === "Product" || link === "Solutions") && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7Z" />
              </svg>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
