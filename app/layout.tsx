import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({ 
  weight: ['300', '400', '500'],
  subsets: ["latin"], 
  variable: "--font-ibm-plex" 
});

export const metadata: Metadata = {
  title: "Sara Lan | Photography Portfolio",
  description: "Artistic direction and visual storytelling by Sara Lan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${ibmPlexSans.variable} font-sans antialiased text-zinc-100 selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
