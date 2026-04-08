import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const fontBody = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--font-body",
});

import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Sara Lan — Portfolio",
  description: "Portfolio of Sara Lan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} antialiased`}
      >
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
