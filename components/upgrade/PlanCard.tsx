"use client";

import { useRouter } from "next/navigation";
import { Plan } from "@/data/upgradePlans";

interface PlanCardProps {
  plan: Plan;
  yearly: boolean;
  student: boolean;
}

export default function PlanCard({ plan, yearly, student }: PlanCardProps) {
  const router = useRouter();

  let price = plan.monthlyPrice;
  if (student && plan.studentMonthlyPrice > 0) price = plan.studentMonthlyPrice;
  else if (yearly && plan.yearlyPrice > 0) price = plan.yearlyPrice;

  const handleClick = () => {
    if (plan.buttonRoute) router.push(plan.buttonRoute);
  };

  const cardStyle: React.CSSProperties =
    plan.isMostPopular
      ? { border: "2px solid #4caf50", backgroundColor: "#fff" }
      : plan.isCurrent
      ? { border: "1px solid #e0e0e0", backgroundColor: "#f7f7f7" }
      : { border: "1px solid #e0e0e0", backgroundColor: "#fff" };

  return (
    <div className="relative flex flex-col rounded-lg p-6" style={cardStyle}>
      {/* Most popular badge */}
      {plan.isMostPopular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm text-white font-medium whitespace-nowrap"
          style={{ backgroundColor: "#4caf50" }}
        >
          &#123;most popular&#125;
        </div>
      )}

      {/* Current plan label */}
      {plan.isCurrent && (
        <p className="text-sm font-medium mb-1" style={{ color: "#1a7f64" }}>
          Your current plan
        </p>
      )}

      {/* Plan name */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>

      {/* Price */}
      {price > 0 && (
        <div className="flex items-baseline gap-0.5 mb-3">
          <span className="text-4xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{plan.description}</p>

      {/* Features */}
      <div className="flex-1 mb-5">
        <p className="text-sm font-semibold mb-2" style={{ color: "#1a7f64" }}>
          Includes:
        </p>
        <ul className="space-y-1.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-1 text-sm text-gray-700">
              <span className="mt-0.5 shrink-0" style={{ color: "#555" }}>·</span>
              <span
                className="border-b border-dotted"
                style={{ borderColor: "#aaa" }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      {plan.buttonLabel && (
        <>
          <button
            onClick={handleClick}
            className="w-full py-3 rounded text-sm font-semibold transition-colors mb-3"
            style={
              plan.buttonStyle === "green"
                ? { backgroundColor: "#1d6131", color: "#fff" }
                : { backgroundColor: "#fff", color: "#333", border: "1px solid #bbb" }
            }
            onMouseEnter={(e) => {
              if (plan.buttonStyle === "green")
                e.currentTarget.style.backgroundColor = "#164e26";
              else e.currentTarget.style.backgroundColor = "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              if (plan.buttonStyle === "green")
                e.currentTarget.style.backgroundColor = "#1d6131";
              else e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            {plan.buttonLabel}
          </button>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-center hover:underline"
            style={{ color: "#2d8659" }}
          >
            Try for free instead →
          </a>
        </>
      )}
    </div>
  );
}
