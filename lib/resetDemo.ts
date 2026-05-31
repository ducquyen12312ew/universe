const DEMO_KEYS = [
  "plan",
  "paymentStatus",
  "lastTransaction",
  "subscription",
  "currentUser",
  "upgradeCompleted",
  "paymentCompleted",
];

export function resetDemo(): void {
  DEMO_KEYS.forEach((key) => localStorage.removeItem(key));

  const dynamicKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("payment_complete_")) dynamicKeys.push(key);
  }
  dynamicKeys.forEach((key) => localStorage.removeItem(key));
}
