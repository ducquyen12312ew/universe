"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  standardPaymentFeatures,
  STANDARD_PRICE_USD,
} from "@/data/upgradePlans";

type PaymentMethod = "card" | "paypal" | "vietqr";

/* ─── Left panel ─── */
function OrderSummaryPanel() {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-0"
      style={{ backgroundColor: "#f5f5f5", width: 280, flexShrink: 0 }}
    >
      {/* Features */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Standard monthly
      </h2>
      <ul className="mb-6 space-y-1.5">
        {standardPaymentFeatures.map((f, i) => (
          <li
            key={i}
            className={`text-sm flex items-start gap-1.5 ${
              i === 0 ? "text-gray-700 font-medium" : ""
            }`}
            style={{ color: i === 0 ? "#555" : "#1a7f9c" }}
          >
            {i > 0 && (
              <span className="mt-1 shrink-0" style={{ color: "#1a7f9c" }}>
                •
              </span>
            )}
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Payment summary */}
      <div className="border-t pt-4" style={{ borderColor: "#ddd" }}>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Payment summary
        </h3>

        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span>Standard monthly</span>
          <span>${STANDARD_PRICE_USD}.00</span>
        </div>

        <div className="flex justify-between text-sm font-bold text-gray-900 mb-4">
          <span>Total per month</span>
          <span>${STANDARD_PRICE_USD}.00</span>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "#1a6bd1" }}>
          We&apos;re confident that you&apos;ll love Overleaf, but if not, you can cancel
          anytime and{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="underline">
            request your money back
          </a>
          , hassle free, within 14 days.
        </p>
      </div>
    </div>
  );
}

/* ─── Card number input row ─── */
function CardNumberInput() {
  return (
    <div className="mb-3">
      <label className="block text-sm text-gray-700 mb-1">Số thẻ</label>
      <div
        className="flex items-center border rounded px-3 py-2.5"
        style={{ borderColor: "#ccc" }}
      >
        <input
          type="text"
          placeholder="1234 1234 1234 1234"
          className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
        />
        <div className="flex items-center gap-1 ml-2 shrink-0">
          <img src="/image/card/visa.png" alt="Visa" className="h-5 object-contain" />
          <img src="/image/card/mastercard.png" alt="MC" className="h-5 object-contain" />
          <span
            className="h-5 px-1.5 flex items-center text-[10px] font-bold text-white rounded"
            style={{ backgroundColor: "#2E77BC" }}
          >
            AMEX
          </span>
          <span
            className="h-5 px-1.5 flex items-center text-[10px] font-bold rounded"
            style={{ backgroundColor: "#fff", border: "1px solid #ccc", color: "#006" }}
          >
            JCB
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Card expiry + CVC row ─── */
function CardExpiryAndCvc() {
  return (
    <div className="flex gap-3 mb-3">
      <div className="flex-1">
        <label className="block text-sm text-gray-700 mb-1">Ngày hết hạn</label>
        <input
          type="text"
          placeholder="MM / YY"
          className="w-full border rounded px-3 py-2.5 text-sm text-gray-700 outline-none"
          style={{ borderColor: "#ccc" }}
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-gray-700 mb-1">Mã bảo mật</label>
        <div
          className="flex items-center border rounded px-3 py-2.5"
          style={{ borderColor: "#ccc" }}
        >
          <input
            type="text"
            placeholder="CVC"
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#aaa">
            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2Zm0 14H4v-6h16v6Zm0-10H4V6h16v2Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Card form ─── */
function CardForm() {
  return (
    <div className="mt-4">
      <CardNumberInput />
      <CardExpiryAndCvc />
    </div>
  );
}

/* ─── PayPal form ─── */
function PayPalForm() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="mt-4 flex flex-col items-center py-6">
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-2 px-8 py-3 rounded text-white text-sm font-semibold transition-colors disabled:opacity-70"
        style={{ backgroundColor: "#003087" }}
        onMouseEnter={(e) =>
          !loading && (e.currentTarget.style.backgroundColor = "#001d5a")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#003087")
        }
      >
        {loading ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8Z" />
            </svg>
            Đang xử lý...
          </>
        ) : (
          <>
            <img src="/image/card/paypal.png" alt="PayPal" className="h-5 object-contain brightness-0 invert" />
            Continue with PayPal
          </>
        )}
      </button>
    </div>
  );
}

/* ─── Radio option wrapper ─── */
function RadioOption({
  id,
  selected,
  onSelect,
  children,
}: {
  id: PaymentMethod;
  selected: PaymentMethod;
  onSelect: (v: PaymentMethod) => void;
  children: React.ReactNode;
}) {
  const isSelected = selected === id;
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 cursor-pointer"
      onClick={() => onSelect(id)}
    >
      {/* Radio circle */}
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors"
        style={{
          borderColor: isSelected ? "#4caf50" : "#aaa",
          backgroundColor: isSelected ? "#4caf50" : "transparent",
        }}
      >
        {isSelected && (
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        )}
      </div>
      {children}
    </div>
  );
}

/* ─── Right panel ─── */
function PaymentPanel() {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    country: "Việt Nam",
    address: "",
    addCompany: false,
  });
  const router = useRouter();

  const handleVietQR = () => {
    router.push("/apps/overleaf/upgrade/vietqr");
  };

  const isFormValid =
    method === "card" && form.lastName && form.firstName && form.address;

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Select a payment method
      </h2>

      {/* Method selector box */}
      <div
        className="rounded-lg border mb-5 overflow-hidden"
        style={{ borderColor: "#ccc" }}
      >
        {/* Card option */}
        <RadioOption id="card" selected={method} onSelect={setMethod}>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ backgroundColor: "#4caf50" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2Zm0 14H4v-6h16v6Zm0-10H4V6h16v2Z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-800">Thẻ</span>
          </div>
        </RadioOption>

        {/* Inline card form */}
        {method === "card" && (
          <div className="px-4 pb-4 border-t" style={{ borderColor: "#eee" }}>
            <CardForm />
          </div>
        )}

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "#e8e8e8" }} />

        {/* PayPal option */}
        <RadioOption id="paypal" selected={method} onSelect={setMethod}>
          <img src="/image/card/paypal.png" alt="PayPal" className="h-6 object-contain" />
          <span className="text-sm text-gray-700">PayPal</span>
        </RadioOption>

        {method === "paypal" && (
          <div className="border-t" style={{ borderColor: "#eee" }}>
            <PayPalForm />
          </div>
        )}

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "#e8e8e8" }} />

        {/* VietQR option */}
        <RadioOption id="vietqr" selected={method} onSelect={setMethod}>
          <img src="/image/card/vietqr.png" alt="VietQR" className="h-6 object-contain" />
          <span className="text-sm text-gray-700">VietQR</span>
        </RadioOption>

        {method === "vietqr" && (
          <div className="px-4 py-4 border-t" style={{ borderColor: "#eee" }}>
            <p className="text-sm text-gray-600 mb-3">
              Quét mã QR để thanh toán qua ngân hàng nội địa.
            </p>
            <button
              onClick={handleVietQR}
              className="w-full py-2.5 rounded text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#1d6131" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#164e26")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1d6131")}
            >
              Thanh toán bằng VietQR
            </button>
          </div>
        )}
      </div>

      {/* Billing details (only for card) */}
      {method !== "paypal" && method !== "vietqr" && (
        <>
          {/* Họ */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Họ</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full border rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
              style={{ borderColor: "#ccc" }}
            />
          </div>

          {/* Tên */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Tên</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full border rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
              style={{ borderColor: "#ccc" }}
            />
          </div>

          {/* Quốc gia */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Quốc gia hoặc khu vực
            </label>
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full border rounded px-3 py-2.5 text-sm text-gray-800 outline-none bg-white appearance-none"
              style={{
                borderColor: "#ccc",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5H7Z' fill='%23666'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option>Việt Nam</option>
              <option>United States</option>
              <option>Japan</option>
              <option>Singapore</option>
            </select>
          </div>

          {/* Địa chỉ */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Dòng địa chỉ 1</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 transition-colors"
              style={{ borderColor: "#ccc" }}
            />
          </div>

          {/* Add company details */}
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={form.addCompany}
              onChange={(e) => setForm({ ...form, addCompany: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            Add company details
          </label>

          {/* Upgrade now */}
          <button
            disabled={!isFormValid}
            className="w-full py-3 rounded text-sm font-semibold text-white transition-colors mb-2 disabled:cursor-not-allowed"
            style={{ backgroundColor: isFormValid ? "#1d6131" : "#c0c0c0" }}
          >
            Upgrade now
          </button>

          <p className="text-xs text-center text-gray-500">
            By subscribing, you agree to our{" "}
            <a href="#" onClick={(e) => e.preventDefault()} className="underline">
              terms of service
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}

/* ─── Main export ─── */
export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-12 px-6">
      <div className="flex gap-8 w-full max-w-3xl">
        <OrderSummaryPanel />
        <PaymentPanel />
      </div>
    </div>
  );
}
