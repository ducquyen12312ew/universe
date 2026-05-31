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

function formatAmount(n: number): string {
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

/* ─── Coin watermark ─── */
function Coin({
  size,
  top,
  right,
  opacity = 0.07,
}: {
  size: number;
  top: number | string;
  right: number | string;
  opacity?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        top,
        right,
        border: `${size > 32 ? 2 : 1.5}px solid rgba(80,80,80,${opacity * 1.5})`,
        color: `rgba(80,80,80,${opacity * 1.5})`,
        fontSize: size * 0.44,
        fontWeight: 500,
        opacity,
      }}
    >
      $
    </div>
  );
}

/* ─── Northwest back arrow SVG (thin stroke only, no fill) ─── */
function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13 13L3 3" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 3H10" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 3V10" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Main screen ─── */
function SuccessContent({
  tx,
  timestamp,
  txRef,
}: {
  tx: TxData;
  timestamp: string;
  txRef: string;
}) {
  const router = useRouter();

  /* ── Type tokens ── */
  /* Label: "Từ tài khoản", "Tới tài khoản", "Lời nhắn", "Mã giao dịch" */
  const label: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    color: "#94a3b8",
    lineHeight: 1.5,
    marginBottom: 12,   /* label → first line of content: 12px */
  };
  /* Primary name line */
  const mainName: React.CSSProperties = {
    fontSize: 19,
    fontWeight: 700,
    color: "#0F172A",
    lineHeight: 1.35,
    marginBottom: 6,    /* name → next detail line: 6px */
  };
  /* Secondary detail lines (bank, account) */
  const detail: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: 2,
  };

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: "#f5f6f7" }}>
      {/* Background image on its own layer so filter doesn't bleed into text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/image/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.35) brightness(1.04) saturate(0.7)",
        }}
      />

      {/* Coin watermarks — match reference positions */}
      <Coin size={44} top={48}  right={52}  opacity={0.07} />
      <Coin size={30} top={118} right={16}  opacity={0.06} />
      <Coin size={20} top={290} right={36}  opacity={0.055} />

      {/* Scrollable content sits above background */}
      <div
        className="relative h-full overflow-y-auto"
        style={{ padding: "30px 28px 72px" }}
      >

        {/* ── Back button ── */}
        <button
          onClick={() => router.push("/apps/overleaf/editor")}
          className="flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1.5px solid #1a1a1a",
            backgroundColor: "transparent",
            marginBottom: 32,
            flexShrink: 0,
          }}
        >
          <BackArrow />
        </button>

        {/* ── Techcombank logo ── */}
        <div style={{ marginBottom: 24 }}>
          <img
            src="/image/bank/techfull.png"
            alt="Techcombank"
            style={{ height: 28, objectFit: "contain", objectPosition: "left", display: "block" }}
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              const next = el.nextElementSibling as HTMLElement | null;
              if (next) next.style.display = "flex";
            }}
          />
          {/* Fallback text logo */}
          <div style={{ display: "none", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#e40000", fontWeight: 900, fontSize: 22, letterSpacing: "-0.5px" }}>
              TECHCOM
            </span>
            <span style={{ color: "#e40000", fontWeight: 900, fontSize: 22 }}>BANK</span>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ marginLeft: 4 }}>
              <polygon points="13,1 5,8 1,8 8,16 6,25 13,21 20,25 18,16 25,8 21,8" fill="#e40000" />
            </svg>
          </div>
        </div>

        {/* ── Amount ── */}
        <div style={{ lineHeight: 1, marginBottom: 6 }}>
          <span style={{ color: "#94a3b8", fontSize: 20, fontWeight: 400, marginRight: 6 }}>
            -VND
          </span>
          <span style={{ color: "#0F172A", fontSize: 40, fontWeight: 600, lineHeight: 1 }}>
            {formatAmount(tx.amount)}
          </span>
        </div>

        {/* ── Timestamp ── */}
        <p style={{ fontSize: 13, fontWeight: 400, color: "#94a3b8", lineHeight: 1.5, marginBottom: 36 }}>
          {timestamp}
        </p>

        {/* ── From ── */}
        <div style={{ marginBottom: 36 }}>
          <p style={label}>Từ tài khoản</p>
          <p style={mainName}>PHAN DUC QUYEN</p>
          <p style={detail}>Techcombank</p>
          <p style={{ ...detail, marginBottom: 0 }}>{SOURCE_ACCOUNT}</p>
        </div>

        {/* ── To ── */}
        <div style={{ marginBottom: 36 }}>
          <p style={label}>Tới tài khoản</p>
          <p style={mainName}>{tx.accountName}</p>
          <p style={{ ...detail, textTransform: "uppercase" }}>{tx.bankName}</p>
          <p style={{ ...detail, marginBottom: 0 }}>{tx.account}</p>
        </div>

        {/* ── Message ── */}
        <div style={{ marginBottom: 40 }}>
          <p style={label}>Lời nhắn</p>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", lineHeight: 1.4 }}>
            {tx.message}
          </p>
        </div>

        {/* ── Transaction ref — standalone block ── */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#94a3b8", lineHeight: 1.5, marginBottom: 6 }}>
            Mã giao dịch
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#334155", lineHeight: 1.5 }}>
            {txRef}
          </p>
        </div>

      </div>
    </div>
  );
}

/* ─── Page export ─── */
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

  const [timestamp] = useState<string>(formatTimestamp);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lastTransaction");
      if (stored) setTx(JSON.parse(stored));
    } catch {}

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
      {/* Desktop: centered phone preview */}
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

      {/* Mobile: full-screen */}
      <div className="sm:hidden" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        {content}
      </div>
    </>
  );
}
