import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubham Dewangan — AI Infrastructure & Distributed Systems",
  description:
    "M.Tech CS at IIIT Hyderabad. Building production-oriented AI infrastructure, distributed systems, and backend engineering solutions.",
  keywords: [
    "Shubham Dewangan",
    "AI Infrastructure",
    "Distributed Systems",
    "Backend Engineering",
    "IIIT Hyderabad",
    "System Design",
    "Machine Learning",
  ],
  openGraph: {
    title: "Shubham Dewangan — AI Infrastructure & Distributed Systems",
    description:
      "M.Tech CS at IIIT Hyderabad. Building production-oriented AI infrastructure, distributed systems, and backend engineering solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}