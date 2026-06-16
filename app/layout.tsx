import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAP - School Assistant for Parents",
  description:
    "Demo prototip aplikacije koja pomaže roditeljima da procene znanje deteta i dobiju predlog plana učenja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
