"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { plans } from "@/data/upgradePlans";
import PlanCard from "./PlanCard";
import { getBalance, PLAN_PRICE_VND, activatePremium } from "@/lib/demoState";

function formatVND(v: number) {
  return v.toLocaleString("vi-VN");
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex items-center rounded-full transition-colors focus:outline-none"
      style={{ width: 44, height: 24, backgroundColor: checked ? "#1d6131" : "#ccc" }}
    >
      <span
        className="inline-block rounded-full bg-white shadow transition-transform"
        style={{
          width: 18,
          height: 18,
          transform: checked ? "translateX(22px)" : "translateX(3px)",
        }}
      />
    </button>
  );
}

function OcbConfirmModal({
  balance,
  onClose,
  onConfirm,
}: {
  balance: number;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const remaining = balance - PLAN_PRICE_VND;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl"
        style={{ backgroundColor: "#fff" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#0a6ebd,#005299)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Xác nhận thanh toán bằng số dư OCB
            </h3>
            <p className="text-xs text-gray-400">Giao dịch sẽ được thực hiện ngay lập tức</p>
          </div>
        </div>

        {/* Detail rows */}
        <div
          className="rounded-xl divide-y overflow-hidden mb-5"
          style={{ border: "1px solid #e8edf2" }}
        >
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-sm text-gray-500">Gói đăng ký</span>
            <span className="text-sm font-semibold text-gray-800">Overleaf Premium</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-sm text-gray-500">Giá gói</span>
            <span className="text-sm font-bold text-gray-900">
              {formatVND(PLAN_PRICE_VND)} VNĐ
            </span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-sm text-gray-500">Số dư hiện tại</span>
            <span className="text-sm font-semibold text-green-600">
              {formatVND(balance)} VNĐ
            </span>
          </div>
          <div
            className="flex justify-between items-center px-4 py-3"
            style={{ backgroundColor: remaining < 0 ? "#fef2f2" : "#f0fdf4" }}
          >
            <span className="text-sm font-semibold text-gray-700">Số dư còn lại</span>
            <span
              className="text-sm font-bold"
              style={{ color: remaining < 0 ? "#dc2626" : "#16a34a" }}
            >
              {formatVND(Math.max(0, remaining))} VNĐ
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mb-5">
          Bằng cách xác nhận, bạn đồng ý với{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="underline text-blue-500">
            Điều khoản dịch vụ
          </a>{" "}
          của Overleaf x OCB.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            style={{ borderColor: "#e0e0e0" }}
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#0a6ebd,#005299)",
              boxShadow: "0 4px 14px rgba(10,110,189,0.3)",
            }}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[600] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      <div className="relative flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-full border-4 animate-spin"
          style={{ borderColor: "#0a6ebd", borderTopColor: "transparent" }}
        />
        <div className="text-center">
          <p className="text-base font-semibold text-gray-800">Đang kích hoạt Premium...</p>
          <p className="text-sm text-gray-400 mt-1">Vui lòng không tắt trang này</p>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [student, setStudent] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const refresh = () => setBalance(getBalance());
    refresh();
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const hasEnoughBalance = balance >= PLAN_PRICE_VND;

  const handleConfirmOcb = () => {
    setShowModal(false);
    setLoading(true);
    setTimeout(() => {
      activatePremium("Standard");
      window.dispatchEvent(new Event("storage"));
      router.push("/apps/overleaf/upgrade/success");
    }, 2500);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      {showModal && (
        <OcbConfirmModal
          balance={balance}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmOcb}
        />
      )}

      <div className="min-h-screen bg-white flex flex-col">
        {/* Top-left logo */}
        <div className="px-8 py-5">
          <Link href="/apps/overleaf" className="flex items-center gap-1.5">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 2C9.16 2 2 9.16 2 18s7.16 16 16 16 16-7.16 16-16S26.84 2 18 2Z"
                fill="#4caf50"
              />
              <path
                d="M12 10c0 0 3 2 3 8s-3 8-3 8M20 10c2 2 4 5 4 8s-2 6-4 8"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-3xl font-bold tracking-tight" style={{ color: "#4caf50", fontFamily: "serif" }}>
              Overleaf
            </span>
            <span className="text-gray-300 text-xl mx-1">×</span>
            <span className="text-3xl font-bold tracking-tight text-gray-800">OCB</span>
          </Link>
        </div>

        <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-16">
          {/* Header */}
          <p className="text-base font-medium mb-2" style={{ color: "#4caf50" }}>
            &#123;plans and pricing&#125;
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Choose your plan
          </h1>

          {/* OCB Balance payment option — shown when balance >= price */}
          {hasEnoughBalance && (
            <div
              className="w-full max-w-4xl mb-8 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#f0f7ff 0%,#e8f4ff 100%)",
                border: "2px solid #0a6ebd",
                boxShadow: "0 4px 20px rgba(10,110,189,0.12)",
              }}
            >
              <div className="flex items-center gap-5 px-6 py-5">
                {/* OCB icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,#0a6ebd,#005299)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-base font-bold text-gray-900">
                      Thanh toán bằng số dư OCB
                    </span>
                    <span
                      className="px-2.5 py-0.5 text-[11px] font-bold rounded-full text-white"
                      style={{ background: "linear-gradient(90deg,#0a6ebd,#4caf50)" }}
                    >
                      ✓ RECOMMENDED
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Tài khoản OCB của bạn đang có{" "}
                    <span className="font-bold text-green-600">
                      {formatVND(balance)} VNĐ
                    </span>{" "}
                    — đủ để thanh toán gói Premium ngay lập tức.
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#16a34a">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
                      </svg>
                      <span className="text-xs text-gray-600">Không cần nhập thẻ</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#16a34a">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
                      </svg>
                      <span className="text-xs text-gray-600">Kích hoạt ngay lập tức</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#16a34a">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
                      </svg>
                      <span className="text-xs text-gray-600">Bảo mật cao nhất</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setShowModal(true)}
                  className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#0a6ebd,#005299)",
                    boxShadow: "0 4px 14px rgba(10,110,189,0.3)",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2Zm0 14H4v-6h16v6Zm0-10H4V6h16v2Z" />
                  </svg>
                  Thanh toán ngay
                </button>
              </div>
            </div>
          )}

          {/* Toggles row */}
          <div className="flex items-center justify-between w-full max-w-4xl mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Yearly</span>
              <Toggle checked={yearly} onChange={setYearly} />
              <span className="text-sm text-gray-500">save 20%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
                </svg>
                Student
              </span>
              <Toggle checked={student} onChange={setStudent} />
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-3 gap-0 w-full max-w-4xl mt-2">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} yearly={yearly} student={student} />
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-500 text-center">
            All prices displayed are in USD. Prices may be subject to additional VAT.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-2 mt-4">
            <img src="/image/card/mastercard.png" alt="Mastercard" className="h-7 object-contain" />
            <img src="/image/card/visa.png" alt="Visa" className="h-7 object-contain" />
            <div
              className="h-7 px-2 flex items-center justify-center rounded text-white text-xs font-bold"
              style={{ backgroundColor: "#2E77BC" }}
            >
              AMEX
            </div>
            <img src="/image/card/paypal.png" alt="PayPal" className="h-7 object-contain" />
            <img
              src="/image/card/vietqr.png"
              alt="VietQR"
              className="h-7 object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </main>
      </div>
    </>
  );
}
