"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  standardPaymentFeatures,
  STANDARD_PRICE_USD,
} from "@/data/upgradePlans";

type PaymentMethod = "paypal" | "vietqr";

/* ─── Left panel ─── */
function OrderSummaryPanel() {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-0"
      style={{ backgroundColor: "#f5f5f5", width: 280, flexShrink: 0 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Standard monthly
      </h2>
      <ul className="mb-6 space-y-1.5">
        {standardPaymentFeatures.map((f, i) => (
          <li
            key={i}
            className="text-sm flex items-start gap-1.5"
            style={{ color: i === 0 ? "#555" : "#1a7f9c" }}
          >
            {i > 0 && (
              <span className="mt-1 shrink-0" style={{ color: "#1a7f9c" }}>•</span>
            )}
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4" style={{ borderColor: "#ddd" }}>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Payment summary</h3>
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
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors"
        style={{
          borderColor: isSelected ? "#4caf50" : "#aaa",
          backgroundColor: isSelected ? "#4caf50" : "transparent",
        }}
      >
        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      {children}
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
    <div className="px-4 pb-4 border-t" style={{ borderColor: "#eee" }}>
      <div className="flex flex-col items-center py-6">
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
              <img
                src="/image/card/paypal.png"
                alt="PayPal"
                className="h-5 object-contain brightness-0 invert"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              Continue with PayPal
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── Right panel ─── */
function PaymentPanel() {
  const [method, setMethod] = useState<PaymentMethod>("vietqr");
  const router = useRouter();

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Select a payment method
      </h2>

      <div
        className="rounded-lg border mb-5 overflow-hidden"
        style={{ borderColor: "#ccc" }}
      >
        {/* PayPal option */}
        <RadioOption id="paypal" selected={method} onSelect={setMethod}>
          <img
            src="/image/card/paypal.png"
            alt="PayPal"
            className="h-6 object-contain"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className="text-sm text-gray-700">PayPal</span>
        </RadioOption>

        {method === "paypal" && <PayPalForm />}

        <div className="border-t" style={{ borderColor: "#e8e8e8" }} />

        {/* VietQR option */}
        <RadioOption id="vietqr" selected={method} onSelect={setMethod}>
          <img
            src="/image/card/vietqr.png"
            alt="VietQR"
            className="h-6 object-contain"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className="text-sm text-gray-700">VietQR — OCB OMNI</span>
        </RadioOption>

        {method === "vietqr" && (
          <div className="px-4 py-4 border-t" style={{ borderColor: "#eee" }}>
            <p className="text-sm text-gray-600 mb-3">
              Quét mã QR bằng ứng dụng <strong>OCB OMNI</strong> hoặc bất kỳ app ngân hàng hỗ trợ VietQR.
            </p>
            <button
              onClick={() => router.push("/apps/overleaf/upgrade/vietqr")}
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

      <p className="text-xs text-center text-gray-500">
        By subscribing, you agree to our{" "}
        <a href="#" onClick={(e) => e.preventDefault()} className="underline">
          terms of service
        </a>
        .
      </p>
    </div>
  );
}

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
