"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PAYMENT_ACCOUNT,
  ACCOUNT_NAME,
  BANK_NAME,
  STANDARD_PRICE_VND,
  SOURCE_ACCOUNT,
} from "@/data/upgradePlans";

interface TxData {
  amount: number;
  account: string;
  accountName: string;
  bankName: string;
  message: string;
  orderId: string;
}

function formatVNDSuccess(n: number): string {
  return n.toLocaleString("en-US");
}

function formatTimestamp(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${hh}:${mm} ${dd}/${mo}/${yyyy}`;
}

/* ─── Decorative floating coin ─── */
function CoinIcon({ size = 36, opacity = 0.08 }: { size?: number; opacity?: number }) {
  return (
    <div
      className="rounded-full border flex items-center justify-center font-bold"
      style={{
        width: size,
        height: size,
        borderColor: `rgba(100,100,100,${opacity * 2})`,
        color: `rgba(100,100,100,${opacity * 2})`,
        fontSize: size * 0.45,
        opacity,
      }}
    >
      $
    </div>
  );
}

/* ─── Main screen content ─── */
function SuccessContent({ tx, timestamp, txRef }: { tx: TxData; timestamp: string; txRef: string }) {
  const router = useRouter();

  return (
    <div
      className="relative w-full h-full overflow-y-auto"
      style={{
        backgroundImage: "url('/image/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      {/* Decorative coins */}
      <div className="absolute top-14 right-14 pointer-events-none">
        <CoinIcon size={40} opacity={0.08} />
      </div>
      <div className="absolute top-40 right-6 pointer-events-none">
        <CoinIcon size={28} opacity={0.06} />
      </div>
      <div className="absolute top-80 right-20 pointer-events-none">
        <CoinIcon size={20} opacity={0.05} />
      </div>

      {/* Scrollable content */}
      <div className="relative px-8 pt-10 pb-14">

        {/* Back button */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/apps/overleaf/editor")}
            className="w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <img
              src="/image/arrow.png"
              alt="Back"
              className="w-7 h-7 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                (e.currentTarget.nextElementSibling as HTMLElement | null)?.removeAttribute("hidden");
              }}
            />
            {/* Fallback arrow */}
            <span hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2Z" />
              </svg>
            </span>
          </button>
        </div>

        {/* Techcombank logo */}
        <div className="mb-8">
          <img
            src="/image/bank/techfull.png"
            alt="Techcombank"
            className="h-10 object-contain object-left"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.nextElementSibling as HTMLElement | null)?.removeAttribute("hidden");
            }}
          />
          {/* Fallback */}
          <div style={{ display: "none" }} className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight" style={{ color: "#e40000" }}>
              TECHCOM<span style={{ color: "#e40000" }}>BANK</span>
            </span>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L7 9H2l5 6-2 9 9-4 9 4-2-9 5-6h-5L14 2Z" fill="#e40000" />
            </svg>
          </div>
        </div>

        {/* Amount */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-2xl text-gray-400 font-normal">-VND</span>
          <span className="text-5xl font-extrabold text-gray-900 leading-none">
            {formatVNDSuccess(tx.amount)}
          </span>
        </div>

        {/* Timestamp */}
        <p className="text-sm text-gray-400 mb-10">{timestamp}</p>

        {/* From */}
        <div className="mb-7">
          <p className="text-sm text-gray-400 mb-1.5">Từ tài khoản</p>
          <p className="text-xl font-extrabold text-gray-900 leading-tight mb-0.5">PHAN DUC QUYEN</p>
          <p className="text-sm text-gray-500">Techcombank</p>
          <p className="text-sm text-gray-500">{SOURCE_ACCOUNT}</p>
        </div>

        {/* To */}
        <div className="mb-7">
          <p className="text-sm text-gray-400 mb-1.5">Tới tài khoản</p>
          <p className="text-xl font-extrabold text-gray-900 leading-tight mb-0.5">{tx.accountName}</p>
          <p className="text-sm text-gray-500 uppercase leading-snug">{tx.bankName}</p>
          <p className="text-sm text-gray-500">{tx.account}</p>
        </div>

        {/* Message */}
        <div className="mb-7">
          <p className="text-sm text-gray-400 mb-1.5">Lời nhắn</p>
          <p className="text-base font-extrabold text-gray-900">{tx.message}</p>
        </div>

        {/* Transaction ref */}
        <div>
          <p className="text-sm font-bold text-gray-800">Mã giao dịch: {txRef}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function PaymentSuccessPage() {
  const router = useRouter();

  const txRef = useMemo(
    () => `FT${Math.floor(Math.random() * 90000000000000 + 10000000000000)}`,
    []
  );

  const [tx, setTx] = useState<TxData>({
    amount: STANDARD_PRICE_VND,
    account: PAYMENT_ACCOUNT,
    accountName: ACCOUNT_NAME,
    bankName: BANK_NAME,
    message: "OVERLEAFS VN chuyen",
    orderId: "demo",
  });

  const [timestamp] = useState(() => formatTimestamp());

  useEffect(() => {
    const stored = localStorage.getItem("lastTransaction");
    if (stored) {
      try { setTx(JSON.parse(stored)); } catch {}
    }

    const t = setTimeout(() => {
      localStorage.setItem("plan", "pro");
      localStorage.setItem("paymentStatus", "success");
      router.push("/apps/overleaf/editor");
    }, 5000);

    return () => clearTimeout(t);
  }, [router]);

  const content = <SuccessContent tx={tx} timestamp={timestamp} txRef={txRef} />;

  return (
    <>
      {/* Desktop: phone frame centered on gray bg */}
      <div
        className="hidden sm:flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "#e5e5ea" }}
      >
        <div
          className="relative overflow-hidden shadow-2xl"
          style={{ width: 390, height: 844, borderRadius: 44 }}
        >
          {content}
        </div>
      </div>

      {/* Mobile: full screen */}
      <div className="sm:hidden w-screen h-screen overflow-hidden">
        {content}
      </div>
    </>
  );
}
