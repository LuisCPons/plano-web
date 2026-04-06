import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComplianceIQ - Premium B2B",
  description: "Automated real estate compliance dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex bg-zinc-950 text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen overflow-y-auto md:ml-64 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
