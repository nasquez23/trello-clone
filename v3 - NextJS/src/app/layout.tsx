import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Trello Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
