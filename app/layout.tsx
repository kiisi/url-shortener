import type { Metadata } from "next";
import "./globals.css";
import { plusJakartaSans } from "./fonts";
import { cn } from "../utils";



export const metadata: Metadata = {
  title: "Miniurl",
  description: "MiniUrl - Shorten URLs in seconds. Share everywhere",
};

import QueryProvider from "./components/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(plusJakartaSans.className, "h-full antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
