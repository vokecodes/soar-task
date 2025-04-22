import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { SidebarMenu } from "./components/SidebarMenu";
import { TopBar } from "./components/TopBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Soar Task",
  description: "By Voke",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lato.variable}`}>
      <body className="font-sans">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar - desktop only */}
          <div className="hidden md:block">
            <SidebarMenu />
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Top bar */}
            <TopBar />

            {/* Page content */}
            <main className="flex-1 overflow-y-auto bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
