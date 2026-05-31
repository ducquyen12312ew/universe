import MobileBankingApp from "@/components/mobile/MobileBankingApp";
import {
  STANDARD_PRICE_VND,
  PAYMENT_ACCOUNT,
  ACCOUNT_NAME,
  BANK_NAME,
} from "@/data/upgradePlans";

interface Props {
  searchParams: Promise<{
    amount?: string;
    account?: string;
    accountName?: string;
    bankName?: string;
    orderId?: string;
  }>;
}

export default async function MobileBankingPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <MobileBankingApp
      amount={params.amount ? parseInt(params.amount) : STANDARD_PRICE_VND}
      account={params.account ?? PAYMENT_ACCOUNT}
      accountName={params.accountName ?? ACCOUNT_NAME}
      bankName={params.bankName ?? BANK_NAME}
      orderId={params.orderId ?? `demo_${Date.now()}`}
    />
  );
}
