import type { Metadata } from "next";
import "./globals.css";
import ResetButton from "@/components/shared/ResetButton";

export const metadata: Metadata = {
  title: "Web Ecosystem",
  description: "Hệ sinh thái website giả lập",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <ResetButton />
      </body>
    </html>
  );
}
