import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MaeSot Night Market | မဲဆောက် ညဈေး",
  description:
    "Explore authentic street food, BBQ skewers, and night market favorites of Mae Sot without signing in.",
  keywords: [
    "Mae Sot",
    "Night Market",
    "မဲဆောက် ညဈေး",
    "ตลาดโต้รุ่งแม่สอด",
    "Food Delivery",
    "Street Food",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen text-slate-900 bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
