export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  studentMonthlyPrice: number;
  description: string;
  features: string[];
  isCurrent: boolean;
  isMostPopular: boolean;
  buttonLabel: string | null;
  buttonRoute: string | null;
  buttonStyle: "green" | "outline" | "current";
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    studentMonthlyPrice: 0,
    description: "A great way to start writing research papers.",
    features: [
      "Basic AI allowance",
      "1 collaborator per project",
      "Basic compile timeout",
    ],
    isCurrent: true,
    isMostPopular: false,
    buttonLabel: null,
    buttonRoute: null,
    buttonStyle: "current",
  },
  {
    id: "standard",
    name: "Standard",
    monthlyPrice: 21,
    yearlyPrice: 17,
    studentMonthlyPrice: 9,
    description: "More space to write, revise, and collaborate.",
    features: [
      "Increased AI allowance",
      "AI Assistant",
      "10 collaborators per project",
      "24x Basic compile timeout",
    ],
    isCurrent: false,
    isMostPopular: true,
    buttonLabel: "Get Standard",
    buttonRoute: "/apps/overleaf/upgrade/payment",
    buttonStyle: "green",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 42,
    yearlyPrice: 34,
    studentMonthlyPrice: 18,
    description: "Best for individuals and teams collaborating on complex projects.",
    features: [
      "Max AI allowance",
      "AI Assistant",
      "Unlimited collaborators per project",
      "24x Basic compile timeout",
    ],
    isCurrent: false,
    isMostPopular: false,
    buttonLabel: "Get Pro",
    buttonRoute: null,
    buttonStyle: "outline",
  },
];

export const standardPaymentFeatures: string[] = [
  "10 collaborators per project, plus:",
  "Increased AI allowance",
  "AI Assistant",
  "Increased compile timeout",
  "Sync with Dropbox and GitHub",
  "Full document history",
  "Track changes",
  "Advanced reference search",
  "Reference manager sync",
  "Symbol palette",
];

export const STANDARD_PRICE_USD = 21;
export const STANDARD_PRICE_VND = 589000;
export const BANK_NAME = "Ngân hàng TMCP Việt Nam Thịnh Vượng";
export const ACCOUNT_NAME = "OVERLEAFS VN";
export const PAYMENT_ACCOUNT = "9704229205090596006";
export const SOURCE_ACCOUNT = "19036406475021";
export const SOURCE_BALANCE_VND = 24651;
export const CORRECT_PIN = "150806";

export function generateTransactionId(): string {
  return Math.floor(Math.random() * 900000000000000000 + 100000000000000000).toString();
}

export function formatVNDComma(amount: number): string {
  return amount.toLocaleString("en-US");
}

export function formatVNDDot(amount: number): string {
  return amount.toLocaleString("vi-VN");
}
