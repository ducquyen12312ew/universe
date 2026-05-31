"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  SOURCE_ACCOUNT,
  SOURCE_BALANCE_VND,
  BANK_NAME,
  CORRECT_PIN,
  formatVNDComma,
} from "@/data/upgradePlans";

export interface MobileBankingProps {
  amount: number;
  account: string;
  accountName: string;
  bankName: string;
  orderId: string;
}

/* ─── Fake status bar ─── */
function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      const n = new Date();
      return `${n.getHours()}:${String(n.getMinutes()).padStart(2, "0")}`;
    };
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
      <span className="text-sm font-semibold text-gray-900">{time}</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" className="text-gray-900">
          <rect x="0" y="6" width="3" height="6" rx="0.5" />
          <rect x="4.5" y="4" width="3" height="8" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" className="text-gray-900">
          <path d="M8 2.5C5.5 2.5 3.3 3.6 1.8 5.3L0 3.5C2 1.3 4.8 0 8 0s6 1.3 8 3.5L14.2 5.3C12.7 3.6 10.5 2.5 8 2.5Z" />
          <path d="M8 6C6.3 6 4.8 6.8 3.8 8L2 6.2C3.4 4.8 5.1 4 8 4s4.6.8 6 2.2L12.2 8C11.2 6.8 9.7 6 8 6Z" />
          <circle cx="8" cy="10.5" r="1.5" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35" className="text-gray-900" />
          <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" className="text-gray-900" />
          <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" className="text-gray-900" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Bank logo circle ─── */
function BankCircle({ src, fallback, size = 44 }: { src: string; fallback: React.ReactNode; size?: number }) {
  const [err, setErr] = useState(false);
  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center bg-gray-100 shrink-0"
      style={{ width: size, height: size }}
    >
      {!err ? (
        <img src={src} alt="" onError={() => setErr(true)} className="w-full h-full object-contain" />
      ) : (
        fallback
      )}
    </div>
  );
}

/* ─── Recipient header (shared across screens) ─── */
function RecipientHeader({ accountName, account }: { accountName: string; account: string }) {
  return (
    <div className="px-5 pt-5 pb-3">
      <p className="text-base font-semibold text-gray-900 mb-3">Bạn muốn chuyển khoản tới</p>
      <div className="flex items-center gap-3">
        <BankCircle
          src="/image/bank/pgbank.png"
          fallback={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#e91e63">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
            </svg>
          }
        />
        <div>
          <p className="text-base font-bold" style={{ color: "#1a6bd1" }}>{accountName}</p>
          <p className="text-base font-medium" style={{ color: "#1a6bd1" }}>{account}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Source account card ─── */
function SourceCard() {
  return (
    <div className="mx-5">
      <p className="text-sm text-gray-500 mb-2">Từ</p>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <BankCircle
              src="/image/wallet.png"
              size={40}
              fallback={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#555">
                  <path d="M21 7.28V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0 0 22 15v-6a2 2 0 0 0-1-1.72ZM20 9v6h-7V9h7Zm-2 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 19V5h14v2h-7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h7v2H5Z" />
                </svg>
              }
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">Tài Khoản Thanh Toán</p>
              <p className="text-sm text-gray-500">{SOURCE_ACCOUNT}</p>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#999"><path d="M7 10l5 5 5-5H7Z" /></svg>
        </div>
        <div className="border-t border-gray-100 px-4 py-2 flex justify-end">
          <span className="text-sm text-gray-600">
            VND <strong>{formatVNDComma(SOURCE_BALANCE_VND)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Numeric keypad ─── */
function NumericKeypad({ onNext }: { onNext: () => void }) {
  const keys = [
    ["1", "2", "3", "⌫"],
    ["4", "5", "6", ""],
    ["7", "8", "9", "Tiếp"],
    ["000", "0", ".", ""],
  ];

  return (
    <div className="mt-auto shrink-0 bg-[#d1d5db]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
      {keys.map((row, ri) => (
        <div key={ri} className="flex">
          {row.map((key, ki) => {
            const isSpecial = key === "Tiếp" || key === "⌫";
            const isGray = key === "" || key === "⌫" || key === "Tiếp";
            const isEmpty = key === "";
            return (
              <button
                key={ki}
                onClick={() => { if (key === "Tiếp") onNext(); }}
                disabled={isEmpty}
                className={`flex-1 flex items-center justify-center transition-opacity active:opacity-60 ${isEmpty ? "cursor-default" : ""}`}
                style={{
                  height: 60,
                  backgroundColor: isGray ? "#aeaeb2" : "white",
                  borderRight: ki < 3 ? "0.5px solid #c7c7c7" : "none",
                  borderBottom: ri < 3 ? "0.5px solid #c7c7c7" : "none",
                }}
              >
                {key === "⌫" ? (
                  <svg width="22" height="16" viewBox="0 0 24 17" fill="none">
                    <path d="M22 1.5H8.5L1.5 8.5l7 7H22a1 1 0 0 0 1-1v-13a1 1 0 0 0-1-1Z" stroke="#333" strokeWidth="1.5" fill="none" />
                    <path d="m9.5 5.5 5 5M14.5 5.5l-5 5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : key === "Tiếp" ? (
                  <span className="text-base font-medium text-gray-700">Tiếp</span>
                ) : (
                  <span className="text-2xl font-light text-gray-800">{key}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Screen 1: Transfer ─── */
function Screen1({ amount, account, accountName, onNext }: {
  amount: number; account: string; accountName: string; onNext: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <RecipientHeader accountName={accountName} account={account} />

      <div className="px-5 py-3">
        <div className="flex items-baseline gap-3">
          <span className="text-base font-medium text-gray-500">VND</span>
          <span className="text-3xl font-bold text-gray-900">{formatVNDComma(amount)}</span>
        </div>
      </div>

      <div className="flex-1" />
      <SourceCard />
      <div className="h-4" />
      <NumericKeypad onNext={onNext} />
    </div>
  );
}

/* ─── Screen 2: Message ─── */
function Screen2({
  amount, account, accountName, message, onMessageChange, onNext,
}: {
  amount: number; account: string; accountName: string;
  message: string; onMessageChange: (m: string) => void; onNext: () => void;
}) {
  const suggestions = ["tiền hàng", "tiền ăn", "học phí", "thanh toán", "chuyển khoản"];
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <RecipientHeader accountName={accountName} account={account} />

      <div className="px-5 pb-3">
        <p className="text-2xl font-bold mb-0.5" style={{ color: "#1a6bd1" }}>
          VND {formatVNDComma(amount)}
        </p>
        <p className="text-sm text-gray-500 mb-2">với lời nhắn</p>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="flex-1 text-base font-medium outline-none border-b-2 pb-1"
            style={{ color: "#1a6bd1", borderColor: "#1a6bd1" }}
            autoFocus
          />
          {message && (
            <button onClick={() => onMessageChange("")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#aaa">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6M9 9l6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="px-5 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onMessageChange(s)}
              className="shrink-0 px-4 py-1.5 rounded-full border text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "#ccc" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* Continue button */}
      <div className="px-5 pb-8">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl text-white text-base font-semibold transition-colors"
          style={{ backgroundColor: "#1a6bd1" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1557b0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a6bd1")}
        >
          Tiếp
        </button>
      </div>
    </div>
  );
}

/* ─── Confirm Bottom Sheet ─── */
function ConfirmSheet({
  amount, account, accountName, bankName, message, onClose, onConfirm,
}: {
  amount: number; account: string; accountName: string; bankName: string;
  message: string; onClose: () => void; onConfirm: () => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end z-40">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl pt-5 pb-8 px-5 animate-slide-down">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-5 text-gray-400 hover:text-gray-700">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Xác nhận chuyển</h2>
        <p className="text-2xl font-bold text-gray-900 mb-5">VND {formatVNDComma(amount)}</p>

        {/* From */}
        <p className="text-sm text-gray-500 mb-2">Từ</p>
        <div className="flex items-center gap-3 mb-4">
          <BankCircle
            src="/image/bank/tech.png"
            size={44}
            fallback={
              <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#e53935" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L7 7H2l4.5 5.5L4.5 19l7.5-3.5 7.5 3.5-2-6.5L22 7h-5L12 2Z" />
                </svg>
              </div>
            }
          />
          <div>
            <p className="text-sm font-bold text-gray-900">Tài khoản thanh toán</p>
            <p className="text-sm text-gray-500">{SOURCE_ACCOUNT}</p>
          </div>
        </div>

        {/* To */}
        <p className="text-sm text-gray-500 mb-2">Tới</p>
        <div className="flex items-center gap-3 mb-5">
          <BankCircle
            src="/image/bank/pgbank.png"
            size={44}
            fallback={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#e91e63">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
              </svg>
            }
          />
          <div>
            <p className="text-sm font-bold text-gray-900">{accountName}</p>
            <p className="text-sm text-gray-500">{account}</p>
            <p className="text-sm text-gray-500">{bankName}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-3 mb-5">
          <div>
            <p className="text-sm text-gray-500">Phí giao dịch</p>
            <p className="text-sm font-bold text-gray-900">VND 0</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lời nhắn</p>
            <p className="text-sm font-bold text-gray-900">{message || "(không có)"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dự kiến nhận tiền</p>
            <p className="text-sm font-bold text-gray-900">Ngay lập tức</p>
          </div>
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-4 rounded-full text-white text-base font-semibold text-center"
          style={{ backgroundColor: "#111" }}
        >
          Xác thực bằng mã mở khoá
        </button>
      </div>
    </div>
  );
}

/* ─── PIN bottom sheet ─── */
function PinSheet({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  const handleKey = (k: string) => {
    if (k === "⌫") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    const next = pin + k;
    if (next.length > 6) return;
    setPin(next);

    if (next.length === 6) {
      setTimeout(() => {
        if (next === CORRECT_PIN) {
          onSuccess();
        } else {
          setShake(true);
          setTimeout(() => { setShake(false); setPin(""); }, 600);
        }
      }, 120);
    }
  };

  const pinKeys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "⌫"],
  ];

  return (
    <div className="absolute inset-0 flex flex-col justify-end z-50">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative bg-white rounded-t-3xl pt-6 pb-6" style={{ height: "48%" }}>
        {/* Handle */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-300" />

        <p className="text-center text-base font-semibold text-gray-800 mb-5">Mã mở khoá</p>

        {/* PIN dots */}
        <div
          className="flex justify-center gap-4 mb-6"
          style={{ animation: shake ? "shake 0.5s ease" : "none" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full border-2 transition-colors"
              style={{
                backgroundColor: i < pin.length ? "#111" : "transparent",
                borderColor: i < pin.length ? "#111" : "#aaa",
              }}
            />
          ))}
        </div>

        {/* PIN pad */}
        <div className="px-6">
          {pinKeys.map((row, ri) => (
            <div key={ri} className="flex justify-between mb-2">
              {row.map((k, ki) => (
                <button
                  key={ki}
                  onClick={() => k && handleKey(k)}
                  disabled={!k}
                  className={`w-20 h-12 rounded-xl flex items-center justify-center text-xl font-medium transition-colors ${
                    k ? "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900" : "cursor-default"
                  }`}
                >
                  {k === "⌫" ? (
                    <svg width="22" height="16" viewBox="0 0 24 17" fill="none">
                      <path d="M22 1.5H8.5L1.5 8.5l7 7H22a1 1 0 0 0 1-1v-13a1 1 0 0 0-1-1Z" stroke="#333" strokeWidth="1.5" />
                      <path d="m9.5 5.5 5 5M14.5 5.5l-5 5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : k}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-10px)}
          40%{transform:translateX(10px)}
          60%{transform:translateX(-10px)}
          80%{transform:translateX(10px)}
        }
      `}</style>
    </div>
  );
}

/* ─── Main exported component ─── */
export default function MobileBankingApp({
  amount, account, accountName, bankName, orderId,
}: MobileBankingProps) {
  const router = useRouter();
  const [screen, setScreen] = useState<"transfer" | "message">("transfer");
  const [message, setMessage] = useState("OVERLEAFS VN chuyen");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleBack = () => {
    if (showPin) { setShowPin(false); return; }
    if (showConfirm) { setShowConfirm(false); return; }
    if (screen === "message") { setScreen("transfer"); return; }
    router.back();
  };

  const handlePinSuccess = () => {
    localStorage.setItem(
      "lastTransaction",
      JSON.stringify({ amount, account, accountName, bankName, message, orderId })
    );
    localStorage.setItem(`payment_complete_${orderId}`, "true");
    router.push("/payment/mobile/success");
  };

  const inner = (
    <div className="relative flex flex-col bg-white overflow-hidden" style={{ width: "100%", height: "100%" }}>
      <StatusBar />

      {/* Back arrow */}
      <div className="px-4 py-2 shrink-0">
        <button onClick={handleBack} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2Z" />
          </svg>
        </button>
      </div>

      {screen === "transfer" && (
        <Screen1 amount={amount} account={account} accountName={accountName} onNext={() => setScreen("message")} />
      )}
      {screen === "message" && (
        <Screen2
          amount={amount} account={account} accountName={accountName}
          message={message} onMessageChange={setMessage}
          onNext={() => setShowConfirm(true)}
        />
      )}

      {showConfirm && !showPin && (
        <ConfirmSheet
          amount={amount} account={account} accountName={accountName}
          bankName={bankName} message={message}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => { setShowConfirm(false); setShowPin(true); }}
        />
      )}

      {showPin && (
        <PinSheet onSuccess={handlePinSuccess} onClose={() => setShowPin(false)} />
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: centered phone frame */}
      <div className="hidden sm:flex min-h-screen items-center justify-center" style={{ backgroundColor: "#e5e5ea" }}>
        <div
          className="relative overflow-hidden shadow-2xl"
          style={{ width: 390, height: 844, borderRadius: 44, background: "white" }}
        >
          {inner}
        </div>
      </div>

      {/* Mobile: full screen */}
      <div className="sm:hidden" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        {inner}
      </div>
    </>
  );
}
