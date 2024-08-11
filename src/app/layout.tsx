import type { Metadata } from "next";

import "./globals.css";
import TopNav from "@/components/Navbar/TopNav";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Yazıcı Eczanesi",
  description: "Sağlığınız için",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopNav />
          <main className="container mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
