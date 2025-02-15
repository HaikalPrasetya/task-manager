import type { Metadata } from "next";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import { ToastContextProvider } from "@/context/ToastContext";

const public_sans = Public_Sans({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manage Task",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${public_sans.className} antialiased`}>
        <ToastContextProvider>
          {children}
          <div id="modal"></div>
          <div id="drawer"></div>
        </ToastContextProvider>
      </body>
    </html>
  );
}
