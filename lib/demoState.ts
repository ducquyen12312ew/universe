export const OCB_BALANCE_KEY = "ocb_balance";
export const PREMIUM_ACTIVATED_KEY = "premium_activated";
export const PAYMENT_COMPLETED_KEY = "payment_completed";
export const PREMIUM_PLAN_KEY = "premium_plan";
export const PREMIUM_DATE_KEY = "premium_date";

export const OCB_DEPOSIT_AMOUNT = 402607;
export const PLAN_PRICE_VND = 402607;

export function getBalance(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(OCB_BALANCE_KEY) || "0", 10);
}

export function setBalance(v: number): void {
  localStorage.setItem(OCB_BALANCE_KEY, String(v));
}

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PREMIUM_ACTIVATED_KEY) === "true";
}

export function activatePremium(plan: string): void {
  localStorage.setItem(PREMIUM_ACTIVATED_KEY, "true");
  localStorage.setItem(PREMIUM_PLAN_KEY, plan);
  localStorage.setItem(PREMIUM_DATE_KEY, new Date().toLocaleDateString("vi-VN"));
  localStorage.setItem(OCB_BALANCE_KEY, "0");
}

export function isPaymentCompleted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PAYMENT_COMPLETED_KEY) === "true";
}

export function setPaymentCompleted(): void {
  localStorage.setItem(PAYMENT_COMPLETED_KEY, "true");
}

export function getPremiumDate(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(PREMIUM_DATE_KEY) || new Date().toLocaleDateString("vi-VN");
}

export function getPremiumPlan(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(PREMIUM_PLAN_KEY) || "Standard";
}
