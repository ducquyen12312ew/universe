"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPremiumDate, getPremiumPlan } from "@/lib/demoState";

/* Simple CSS-based confetti using pseudo-random positioning */
const CONFETTI_COLORS = [
  "#4caf50", "#ffd700", "#0a6ebd", "#ff6b6b", "#a78bfa", "#34d399", "#f59e0b",
];

function ConfettiParticle({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = `${(index * 7.3 + 5) % 95}%`;
  const delay = `${(index * 0.13) % 1.5}s`;
  const duration = `${2.2 + (index % 3) * 0.4}s`;
  const size = index % 3 === 0 ? 8 : 6;

  return (
    <div
      className="absolute top-0 rounded-sm"
      style={{
        left,
        width: size,
        height: size * 1.5,
        backgroundColor: color,
        animation: `confetti-fall ${duration} ${delay} ease-in forwards`,
        opacity: 0,
      }}
    />
  );
}

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(4);
  const [plan, setPlan] = useState("Standard");
  const [date, setDate] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setPlan(getPremiumPlan());
    setDate(getPremiumDate());
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/apps/overleaf");
      return;
    }
    const t = setInterval(() => setCountdown((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [countdown, router]);

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh) rotate(540deg); opacity: 0; }
        }
        @keyframes pop-in {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .pop-in  { animation: pop-in  0.5s cubic-bezier(.34,1.56,.64,1) forwards; }
        .slide-up { animation: slide-up 0.5s ease forwards; }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#0f2027,#203a43,#2c5364)" }}
      >
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiParticle key={i} index={i} />
          ))}
        </div>

        {/* Glow ring behind checkmark */}
        <div
          className="absolute"
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(76,175,80,0.25) 0%,transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Card */}
        <div
          className="relative flex flex-col items-center px-10 py-12 rounded-3xl text-center max-w-md w-full mx-4"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Check circle */}
          <div
            className="pop-in mb-6"
            style={{ opacity: 0 }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: "linear-gradient(135deg,#4caf50,#1d6131)",
                boxShadow: "0 0 0 8px rgba(76,175,80,0.15), 0 0 40px rgba(76,175,80,0.4)",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div
            className="slide-up"
            style={{ opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span
                className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider"
                style={{ background: "linear-gradient(90deg,#4caf50,#1d6131)", color: "#fff" }}
              >
                PRO
              </span>
              <span
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{ background: "rgba(10,110,189,0.2)", color: "#60a5fa", border: "1px solid rgba(10,110,189,0.3)" }}
              >
                via OCB
              </span>
            </div>

            <h1 className="text-3xl font-black text-white mb-2 leading-tight">
              Upgrade Successful!
            </h1>
            <p className="text-xl font-bold mb-1" style={{ color: "#4ade80" }}>
              Premium Activated
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Cảm ơn bạn đã tin tưởng Overleaf × OCB
            </p>
          </div>

          {/* Info rows */}
          <div
            className="slide-up w-full rounded-xl divide-y overflow-hidden mb-8"
            style={{
              opacity: 0,
              animationDelay: "0.5s",
              animationFillMode: "forwards",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {[
              { label: "Gói đăng ký", value: `Overleaf ${plan}` },
              { label: "Kích hoạt qua", value: "OCB OMNI" },
              { label: "Ngày kích hoạt", value: date || new Date().toLocaleDateString("vi-VN") },
              { label: "Trạng thái", value: "● Active", green: true },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center px-4 py-3"
              >
                <span className="text-xs text-gray-400">{row.label}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: row.green ? "#4ade80" : "#fff" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div
            className="slide-up flex items-center gap-2 text-gray-400 text-sm"
            style={{ opacity: 0, animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <svg
              className="animate-spin"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#4caf50"
            >
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8Z" />
            </svg>
            <span>
              Chuyển về Dashboard sau{" "}
              <span className="font-bold text-white">{countdown}s</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
