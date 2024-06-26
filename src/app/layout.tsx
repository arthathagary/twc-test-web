import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({
  src: "../../public/assets/font/futuraMediumBT.woff",
});

export const metadata: Metadata = {
  title: "Contacts App -TWC",
  description: "Contacts App -TWC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full antialiased", myFont.className)}>
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
