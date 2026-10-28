import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

const font = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });
export const metadata = { title: "বাজার দর", description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।", icons: { icon: "/logo-icon.png" } };

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazar">
      <body className={`${font.className} bg-base-100 text-neutral`}>
        <Providers>
          <Navbar />
          <Ticker />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
