"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import {
  STANDARD_PRICE_VND,
  BANK_NAME,
  ACCOUNT_NAME,
  PAYMENT_ACCOUNT,
  generateTransactionId,
  formatVNDDot,
} from "@/data/upgradePlans";

const COUNTDOWN_SECONDS = 15 * 60;
type PaymentState = "idle" | "loading" | "processing" | "success";

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a7f9c">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1Zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 16H8V7h11v14Z" />
    </svg>
  );
}

function ScanCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const s = 3;
  const sz = 22;
  const base: React.CSSProperties = {
    position: "absolute", width: sz, height: sz,
    borderColor: "#444", borderStyle: "solid", borderWidth: 0,
  };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTopWidth: s, borderLeftWidth: s },
    tr: { top: 0, right: 0, borderTopWidth: s, borderRightWidth: s },
    bl: { bottom: 0, left: 0, borderBottomWidth: s, borderLeftWidth: s },
    br: { bottom: 0, right: 0, borderBottomWidth: s, borderRightWidth: s },
  };
  return <div style={{ ...base, ...map[position] }} />;
}

/* ─── Right panel state overlay ─── */
function PaymentStatePanel({ state }: { state: PaymentState }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-5 py-10">
      {state === "loading" && (
        <>
          <div
            className="w-16 h-16 rounded-full border-4 animate-spin"
            style={{ borderColor: "#4caf50", borderTopColor: "transparent" }}
          />
          <div className="text-center">
            <p className="text-base text-gray-700 font-semibold mb-1">
              Đang kiểm tra giao dịch...
            </p>
            <p className="text-sm text-gray-400">Vui lòng chờ trong giây lát</p>
          </div>
        </>
      )}

      {state === "processing" && (
        <>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
            style={{ backgroundColor: "#e8f5e9" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#4caf50">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-gray-800 mb-1">
              Đang xác nhận gói dịch vụ...
            </p>
            <div className="flex gap-1 justify-center mt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: "#4caf50", animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {state === "success" && (
        <>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#4caf50" }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 mb-1">Upgrade successful!</p>
            <p className="text-sm text-gray-500">Đang chuyển hướng về Overleaf...</p>
          </div>
        </>
      )}
    </div>
  );
}

export default function VietQRPage() {
  const router = useRouter();

  const transactionId = useMemo(() => generateTransactionId(), []);
  const accountRef = useMemo(() => `OVL${transactionId.slice(-12)}`, [transactionId]);

  const [qrUrl, setQrUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const [copied, setCopied] = useState(false);
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const triggered = useRef(false);

  /* Build QR URL on client */
  useEffect(() => {
    const params = new URLSearchParams({
      amount: String(STANDARD_PRICE_VND),
      account: PAYMENT_ACCOUNT,
      accountName: ACCOUNT_NAME,
      bankName: BANK_NAME,
      orderId: transactionId,
    });
    setQrUrl(`${window.location.origin}/payment/mobile?${params.toString()}`);
  }, [transactionId]);

  /* Countdown */
  useEffect(() => {
    if (timeLeft <= 0 || paymentState !== "idle") return;
    const t = setInterval(() => setTimeLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, paymentState]);

  /* Idempotent success flow */
  const startPaymentFlow = useCallback(() => {
    if (triggered.current) return;
    triggered.current = true;
    setPaymentState("loading");
    setTimeout(() => setPaymentState("processing"), 10000);
    setTimeout(() => {
      setPaymentState("success");
      localStorage.setItem("plan", "pro");
      localStorage.setItem("paymentStatus", "success");
      setTimeout(() => router.push("/apps/overleaf/editor"), 2000);
    }, 15000);
  }, [router]);

  /* Same-browser cross-tab sync (mobile banking page on same device) */
  useEffect(() => {
    const key = `payment_complete_${transactionId}`;
    if (localStorage.getItem(key) === "true") { startPaymentFlow(); return; }

    const handler = (e: StorageEvent) => {
      if (e.key === key && e.newValue === "true") startPaymentFlow();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [transactionId, startPaymentFlow]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const expired = timeLeft === 0 && paymentState === "idle";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountRef).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openMobilePage = () => {
    if (qrUrl) window.open(qrUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-4 border-b" style={{ borderColor: "#eee" }}>
        <div className="flex flex-col leading-none">
          <img
            src="/image/card/zalopay.png"
            alt="ZaloPay"
            className="h-8 object-contain object-left"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className="text-[10px] font-bold text-gray-500 tracking-widest mt-0.5">GATEWAY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🇻🇳</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#555"><path d="M7 10l5 5 5-5H7Z" /></svg>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="flex gap-10 w-full max-w-4xl">

          {/* Left: order info */}
          <div className="rounded-xl p-6 flex flex-col" style={{ width: 340, flexShrink: 0, border: "1px solid #e0e0e0" }}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin đơn hàng</h2>

            <div className="flex items-center gap-3 mb-5">
              <img src="/image/card/zalopay.png" alt="ZaloPay" className="h-7 object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
              <span className="text-sm font-medium text-gray-800">Overleaf Standard Monthly</span>
            </div>

            <div className="border-t pt-4 mb-4" style={{ borderColor: "#eee" }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Giá trị đơn hàng</span>
                <span className="text-sm text-gray-800">đ{formatVNDDot(STANDARD_PRICE_VND)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-medium">Số tiền thanh toán</span>
                <span className="text-base font-bold text-gray-900">đ{formatVNDDot(STANDARD_PRICE_VND)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4" style={{ borderColor: "#eee" }}>
              <p className="text-xs text-gray-500 mb-1">Mã giao dịch</p>
              <p className="text-sm font-mono text-gray-800 break-all">{transactionId}</p>
            </div>

            <div className="border-t pt-4 mb-5" style={{ borderColor: "#eee" }}>
              <p className="text-xs text-gray-500 mb-1">Nội dung</p>
              <p className="text-sm font-semibold" style={{ color: "#1B6BF5" }}>
                Overleaf Standard Monthly qua VietQR — OVL{transactionId.slice(-8)}
              </p>
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-3 rounded-lg py-3 px-4" style={{ backgroundColor: "#fff8e1" }}>
              {paymentState !== "idle" ? (
                <span className="text-sm font-semibold" style={{ color: "#4caf50" }}>
                  ✓ Thanh toán đang được xử lý
                </span>
              ) : expired ? (
                <span className="text-sm font-semibold text-red-600">⚠ Payment Expired</span>
              ) : (
                <>
                  <span className="text-sm text-gray-700">Giao dịch kết thúc trong</span>
                  <span className="text-base font-bold text-gray-900 font-mono">
                    {String(minutes).padStart(2, "0")} <span className="text-gray-500">:</span> {String(seconds).padStart(2, "0")}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right: QR */}
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 self-start">
              Quét QR để thanh toán
            </h2>

            <div className="rounded-xl p-5 flex flex-col items-center" style={{ border: "1px solid #e0e0e0", width: 360, minHeight: 320 }}>
              {paymentState !== "idle" ? (
                <PaymentStatePanel state={paymentState} />
              ) : (
                <>
                  {/* QR code */}
                  <div className="relative mb-5" style={{ padding: 16 }}>
                    <ScanCorner position="tl" />
                    <ScanCorner position="tr" />
                    <ScanCorner position="bl" />
                    <ScanCorner position="br" />

                    {expired || !qrUrl ? (
                      <div className="flex items-center justify-center bg-gray-100 rounded" style={{ width: 220, height: 220 }}>
                        {!qrUrl
                          ? <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                          : <div className="text-center"><div className="text-3xl mb-2">⛔</div><p className="text-sm text-gray-500">QR hết hạn</p></div>
                        }
                      </div>
                    ) : (
                      <QRCode value={qrUrl} size={220} level="H" style={{ display: "block" }} />
                    )}
                  </div>

                  {/* Bank info */}
                  <div className="text-center mb-4">
                    <p className="text-sm mb-1" style={{ color: "#1a7f9c" }}>{BANK_NAME}</p>
                    <p className="text-base font-bold text-gray-900 mb-1">{ACCOUNT_NAME}</p>
                    <button onClick={handleCopy} className="flex items-center gap-1.5 mx-auto text-sm" style={{ color: "#1a7f9c" }}>
                      <span className="font-mono">{accountRef}</span>
                      {copied
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#4caf50"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" /></svg>
                        : <CopyIcon />
                      }
                    </button>
                  </div>

                  {/* ── "Đã thanh toán" button ── */}
                  {!expired && (
                    <button
                      onClick={startPaymentFlow}
                      className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: "#4caf50" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
                    >
                      ✓ Đã thanh toán
                    </button>
                  )}

                  {/* Demo link */}
                  <div className="mt-3 pt-3 border-t w-full text-center" style={{ borderColor: "#eee" }}>
                    <button
                      onClick={openMobilePage}
                      className="text-xs underline hover:opacity-70 transition-colors"
                      style={{ color: "#1a7f9c" }}
                    >
                      ↗ Mở trang thanh toán demo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Cancel */}
        <button
          onClick={() => router.push("/apps/overleaf/upgrade/payment")}
          className="mt-8 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <span>×</span><span>Hủy giao dịch</span>
        </button>
      </main>

      {/* Footer */}
      <footer className="px-8 py-5 border-t flex items-center justify-between" style={{ borderColor: "#eee" }}>
        <div>
          <p className="text-sm font-bold tracking-widest text-gray-700">GATEWAY</p>
          <p className="text-xs text-gray-400">Hỗ trợ khách hàng</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border rounded px-2 py-1" style={{ borderColor: "#ddd" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#4caf50"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" /></svg>
            <span className="text-xs text-gray-600">Secure</span>
          </div>
          <div className="flex items-center gap-1.5 border rounded px-2 py-1" style={{ borderColor: "#ddd" }}>
            <span className="text-xs font-bold text-gray-600">PCI</span>
            <span className="text-xs font-bold text-white px-1 rounded" style={{ backgroundColor: "#c00" }}>DSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
