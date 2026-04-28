import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Pawas AI | Neural Control System",
  description: "Next-gen productivity workspace for traders, developers, and entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 ml-64 overflow-y-auto bg-background/50">
            <div className="max-w-7xl mx-auto p-8 animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
