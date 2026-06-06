"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getBalance } from "@/lib/demoState";

/* ── Eye icon ── */
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

/* ── Balance card ── */
function BalanceCard() {
  const [shown, setShown] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(getBalance());
    const refresh = () => setBalance(getBalance());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

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
          className="text-sm font-bold transition-all duration-300"
          style={{
            color: shown && balance > 0 ? "#4ade80" : "#94a3b8",
            letterSpacing: shown ? "0" : "2px",
          }}
        >
          {shown ? (balance > 0 ? balance.toLocaleString("vi-VN") + " VNĐ" : "0 VNĐ") : "• • • • •"}
        </div>
      </div>

      <button
        onClick={() => setShown((v) => !v)}
        className="text-gray-400 hover:text-white transition-colors ml-0.5"
      >
        <EyeIcon open={shown} />
      </button>
    </div>
  );
}

/* ── Bank account panel ── */
function BankPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute right-0 top-full mt-2 z-[400] w-80 rounded-2xl overflow-hidden"
      style={{
        background: "#1a2535",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div>
          <p className="text-sm font-bold text-white">Ngân hàng liên kết</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Tài khoản thanh toán của bạn</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
          </svg>
        </button>
      </div>

      {/* OCB — active */}
      <div
        className="flex items-center gap-3.5 px-5 py-4 cursor-pointer transition-colors"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
          style={{ background: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <img
            src="/image/bank/ocb.png"
            alt="OCB"
            className="w-9 h-9 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const span = document.createElement("span");
              span.className = "text-xs font-black";
              span.style.color = "#0a6ebd";
              span.textContent = "OCB";
              e.currentTarget.parentNode?.appendChild(span);
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">OCB</span>
            <span
              className="px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider"
              style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }}
            >
              Mặc định
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono tracking-wider">
            •••• •••• 5562
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-green-400 font-medium">Hoạt động</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#4b5563">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z" />
          </svg>
        </div>
      </div>

      {/* Techcombank — locked/grayed */}
      <div
        className="flex items-center gap-3.5 px-5 py-4 cursor-not-allowed select-none"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          opacity: 0.4,
          filter: "grayscale(1)",
        }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
          style={{ background: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <img
            src="/image/bank/tech.png"
            alt="Techcombank"
            className="w-9 h-9 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const span = document.createElement("span");
              span.className = "text-[9px] font-black text-center leading-tight";
              span.style.color = "#cc0000";
              span.textContent = "TCB";
              e.currentTarget.parentNode?.appendChild(span);
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">Techcombank</span>
            <span
              className="px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider"
              style={{ background: "rgba(255,255,255,0.08)", color: "#6b7280" }}
            >
              Đã khoá
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono tracking-wider">
            •••• •••• 5021
          </p>
        </div>

        <div className="shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#4b5563">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2Zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2Z" />
          </svg>
        </div>
      </div>

      {/* Add bank button */}
      <div className="px-5 py-4">
        <button
          className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px dashed rgba(255,255,255,0.2)",
            color: "#94a3b8",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
          </svg>
          Thêm liên kết ngân hàng
        </button>
      </div>
    </div>
  );
}

/* ── Avatar button ── */
function AvatarButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center rounded-full transition-all duration-200 hover:ring-2 hover:ring-white/20 active:scale-95"
        style={{
          width: 34,
          height: 34,
          background: "linear-gradient(135deg,#4caf50,#0a6ebd)",
          boxShadow: open ? "0 0 0 2px rgba(76,175,80,0.5)" : "none",
        }}
        title="Tài khoản & Ngân hàng"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" />
        </svg>
      </button>

      {open && <BankPanel onClose={() => setOpen(false)} />}
    </div>
  );
}

/* ── Main export ── */
export default function OverleafTopBar() {
  const navLinks = ["Product", "Solutions", "Templates", "Pricing"];

  return (
    <header
      className="flex items-center justify-between px-6 py-2.5 border-b shrink-0"
      style={{ backgroundColor: "#1b2638", borderColor: "#2d3d56" }}
    >
      {/* Logo */}
      <Link href="/apps/overleaf" className="flex items-center">
        <img
          src="/image/overocb.png"
          alt="Overleaf x OCB"
          className="h-9 object-contain object-left"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div className="items-center gap-2 hidden">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" fill="#4caf50" />
            <path d="M8 7c0 0 2 1 2 5s-2 5-2 5M13 7c1.5 1.5 3 3 3 5s-1.5 3.5-3 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-white font-bold text-base">Overleaf</span>
          <span className="text-gray-400 text-sm mx-0.5">×</span>
          <span className="text-white font-bold text-base">OCB</span>
        </div>
      </Link>

      {/* Center: Balance card */}
      <BalanceCard />

      {/* Right: Nav + Avatar */}
      <div className="flex items-center gap-5">
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

        <AvatarButton />
      </div>
    </header>
  );
}
