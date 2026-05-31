"use client";

import { useState } from "react";
import Link from "next/link";
import { plans } from "@/data/upgradePlans";
import PlanCard from "./PlanCard";

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
      style={{
        width: 44,
        height: 24,
        backgroundColor: checked ? "#1d6131" : "#ccc",
      }}
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

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [student, setStudent] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top-left Overleaf logo */}
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
          <span
            className="text-3xl font-bold tracking-tight"
            style={{ color: "#4caf50", fontFamily: "serif" }}
          >
            Overleaf
          </span>
        </Link>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-6 pb-16">
        {/* Header */}
        <p className="text-base font-medium mb-2" style={{ color: "#4caf50" }}>
          &#123;plans and pricing&#125;
        </p>
        <h1 className="text-5xl font-bold text-gray-900 mb-10 tracking-tight">
          Choose your plan
        </h1>

        {/* Toggles row */}
        <div className="flex items-center justify-between w-full max-w-4xl mb-8">
          {/* Yearly toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Yearly</span>
            <Toggle checked={yearly} onChange={setYearly} />
            <span className="text-sm text-gray-500">save 20%</span>
          </div>

          {/* Student toggle */}
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
        <div className="grid grid-cols-3 gap-0 w-full max-w-4xl mt-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} yearly={yearly} student={student} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-sm text-gray-500 text-center">
          All prices displayed are in USD. Prices may be subject to additional VAT, depending on your country.
        </p>

        {/* Payment card icons */}
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
        </div>
      </main>
    </div>
  );
}
