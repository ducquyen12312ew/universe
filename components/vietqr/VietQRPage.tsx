"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { setBalance, setPaymentCompleted, OCB_DEPOSIT_AMOUNT } from "@/lib/demoState";
import { formatVNDDot, generateTransactionId } from "@/data/upgradePlans";

type ButtonState = "idle" | "processing" | "done";

export default function VietQRPage() {
  const router = useRouter();
  const [btnState, setBtnState] = useState<ButtonState>("idle");
  const [progress, setProgress] = useState(0);
  const [transactionId] = useState(() => generateTransactionId());
  const triggered = useRef(false);

  /* Progress bar animation during 10s */
  useEffect(() => {
    if (btnState !== "processing") return;
    const start = Date.now();
    const duration = 10000;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [btnState]);

  const handlePay = () => {
    if (triggered.current) return;
    triggered.current = true;
    setBtnState("processing");

    setTimeout(() => {
      setBtnState("done");
      setBalance(OCB_DEPOSIT_AMOUNT);
      setPaymentCompleted();
      /* Dispatch storage event so other tabs / components update */
      window.dispatchEvent(new Event("storage"));
      setTimeout(() => router.push("/apps/overleaf"), 1200);
    }, 10000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f7fa" }}>
      {/* Top bar — OCB branding */}
      <header
        className="flex items-center justify-between px-8 py-4 shrink-0"
        style={{ backgroundColor: "#fff", borderBottom: "1px solid #e8edf2" }}
      >
        <div className="flex items-center gap-3">
          {/* OCB logo placeholder */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: "linear-gradient(135deg,#0a6ebd,#005299)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" />
            </svg>
            <span className="text-white font-bold text-sm tracking-wide">OCB OMNI</span>
          </div>
          <div className="h-5 w-px bg-gray-200" />
          <span className="text-sm text-gray-500 font-medium">Cổng thanh toán</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-200 bg-green-50">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#16a34a">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" />
            </svg>
            <span className="text-[11px] font-semibold text-green-700">Bảo mật SSL</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="flex gap-7 w-full max-w-4xl">

          {/* Left: Order info */}
          <div
            className="rounded-2xl p-6 flex flex-col"
            style={{
              width: 320,
              flexShrink: 0,
              backgroundColor: "#fff",
              border: "1px solid #e8edf2",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a6ebd">
                <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2Zm0 14H4v-6h16v6Zm0-10H4V6h16v2Z" />
              </svg>
              Thông tin đơn hàng
            </h2>

            {/* Product */}
            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-4"
              style={{ backgroundColor: "#f0f7ff" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,#4caf50,#1d6131)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
                  <path d="M8 8s1.5 1 1.5 4S8 16 8 16M13 8c1 1 2.5 2.5 2.5 4S14 15.5 13 16" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Gói dịch vụ</p>
                <p className="text-sm font-semibold text-gray-800">Overleaf Premium</p>
              </div>
            </div>

            {/* Amount breakdown */}
            <div className="border-t pt-4 mb-4" style={{ borderColor: "#f0f0f0" }}>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm text-gray-500">Giá trị đơn hàng</span>
                <span className="text-sm text-gray-700">
                  {formatVNDDot(OCB_DEPOSIT_AMOUNT)}đ
                </span>
              </div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm text-gray-500">Phí xử lý</span>
                <span className="text-sm text-green-600 font-medium">Miễn phí</span>
              </div>
              <div
                className="flex justify-between items-center pt-2.5 border-t"
                style={{ borderColor: "#f0f0f0" }}
              >
                <span className="text-sm font-bold text-gray-800">Tổng thanh toán</span>
                <span className="text-lg font-bold" style={{ color: "#0a6ebd" }}>
                  {formatVNDDot(OCB_DEPOSIT_AMOUNT)}đ
                </span>
              </div>
            </div>

            {/* Transaction ID */}
            <div
              className="rounded-lg px-3 py-2.5 mb-4"
              style={{ backgroundColor: "#f8fafc" }}
            >
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                Mã giao dịch
              </p>
              <p className="text-xs font-mono text-gray-600 break-all">
                {transactionId.slice(0, 16)}...
              </p>
            </div>

            {/* Merchant */}
            <div className="flex items-center gap-2 mt-auto pt-3 border-t" style={{ borderColor: "#f0f0f0" }}>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#4caf50,#1d6131)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Đơn vị thụ hưởng</p>
                <p className="text-xs font-semibold text-gray-700">OVERLEAF VN</p>
              </div>
            </div>
          </div>

          {/* Right: QR */}
          <div className="flex-1 flex flex-col items-center">
            {btnState === "done" ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center flex-1 gap-5 py-10">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#16a34a">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800 mb-1">Giao dịch thành công</p>
                  <p className="text-sm text-gray-500">Đang chuyển về dashboard...</p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 self-start">
                  Quét QR để nạp tiền
                </h2>
                <p className="text-sm text-gray-500 mb-6 self-start">
                  Sử dụng ứng dụng OCB OMNI để quét mã và hoàn tất giao dịch
                </p>

                {/* QR Card */}
                <div
                  className="rounded-2xl p-6 flex flex-col items-center w-full max-w-sm"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8edf2",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* VietQR logo strip */}
                  <div className="flex items-center gap-2 mb-4 self-stretch justify-between">
                    <img
                      src="/image/card/vietqr.png"
                      alt="VietQR"
                      className="h-6 object-contain"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md"
                      style={{ backgroundColor: "#f0f7ff" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#0a6ebd">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" />
                      </svg>
                      <span className="text-[10px] font-bold text-blue-700">OCB OMNI</span>
                    </div>
                  </div>

                  {/* QR image */}
                  <div
                    className="relative mb-4 rounded-xl overflow-hidden"
                    style={{
                      padding: 12,
                      background: "linear-gradient(145deg,#f8fafc,#eef2f7)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    {/* Corner accents */}
                    {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                      <div
                        key={pos}
                        className="absolute"
                        style={{
                          width: 20,
                          height: 20,
                          top: pos.includes("t") ? 6 : "auto",
                          bottom: pos.includes("b") ? 6 : "auto",
                          left: pos.includes("l") ? 6 : "auto",
                          right: pos.includes("r") ? 6 : "auto",
                          borderColor: "#0a6ebd",
                          borderStyle: "solid",
                          borderTopWidth: pos.includes("t") ? 2.5 : 0,
                          borderBottomWidth: pos.includes("b") ? 2.5 : 0,
                          borderLeftWidth: pos.includes("l") ? 2.5 : 0,
                          borderRightWidth: pos.includes("r") ? 2.5 : 0,
                          borderRadius: 2,
                        }}
                      />
                    ))}

                    <img
                      src="/image/qr.png"
                      alt="QR Code OCB OMNI"
                      className="block"
                      style={{ width: 240, height: 240, objectFit: "contain" }}
                      onError={(e) => {
                        /* Fallback placeholder if qr.png missing */
                        const el = e.currentTarget;
                        el.style.display = "none";
                        const fb = document.createElement("div");
                        fb.style.cssText = "width:240px;height:240px;display:flex;align-items:center;justify-content:center;background:#f1f5f9;border-radius:8px;";
                        fb.innerHTML = '<span style="color:#94a3b8;font-size:13px;text-align:center;">QR Code<br/>sẽ hiện ở đây</span>';
                        el.parentNode?.appendChild(fb);
                      }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm font-semibold text-gray-700 mb-1 text-center">
                    Quét mã bằng ứng dụng OCB OMNI
                  </p>
                  <p className="text-xs text-gray-400 text-center mb-5">
                    Mở app → Thanh toán → Quét QR
                  </p>

                  {/* Amount badge */}
                  <div
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl mb-5"
                    style={{ backgroundColor: "#f0f7ff", border: "1px solid #bfdbfe" }}
                  >
                    <span className="text-sm text-blue-700 font-medium">Số tiền</span>
                    <span className="text-base font-bold text-blue-900">
                      {formatVNDDot(OCB_DEPOSIT_AMOUNT)}đ
                    </span>
                  </div>

                  {/* Progress bar when processing */}
                  {btnState === "processing" && (
                    <div className="w-full mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>Đang xác nhận thanh toán...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: "#e8edf2" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-100"
                          style={{
                            width: `${progress}%`,
                            background: "linear-gradient(90deg,#0a6ebd,#4caf50)",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Pay button */}
                  <button
                    onClick={handlePay}
                    disabled={btnState === "processing"}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2.5 disabled:cursor-not-allowed"
                    style={{
                      background:
                        btnState === "processing"
                          ? "#94a3b8"
                          : "linear-gradient(135deg,#0a6ebd,#005299)",
                      boxShadow:
                        btnState === "processing"
                          ? "none"
                          : "0 4px 14px rgba(10,110,189,0.35)",
                    }}
                  >
                    {btnState === "processing" ? (
                      <>
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8Z" />
                        </svg>
                        Đang xác nhận giao dịch...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
                        </svg>
                        THANH TOÁN
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cancel link */}
        {btnState === "idle" && (
          <button
            onClick={() => router.push("/apps/overleaf/upgrade/payment")}
            className="mt-8 flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1Z" />
            </svg>
            Hủy giao dịch
          </button>
        )}
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-4 flex items-center justify-between"
        style={{ backgroundColor: "#fff", borderTop: "1px solid #e8edf2" }}
      >
        <p className="text-xs text-gray-400">
          © 2025 OCB OMNI · Hệ thống thanh toán trực tuyến
        </p>
        <div className="flex items-center gap-2">
          <img
            src="/image/card/visa.png"
            alt="Visa"
            className="h-5 object-contain opacity-60"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <img
            src="/image/card/mastercard.png"
            alt="Mastercard"
            className="h-5 object-contain opacity-60"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <img
            src="/image/card/vietqr.png"
            alt="VietQR"
            className="h-5 object-contain opacity-60"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </footer>
    </div>
  );
}
