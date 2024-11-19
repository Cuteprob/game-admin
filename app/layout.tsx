import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

// 配置字体
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sprunkiphase4.app'),
  openGraph: {
    siteName: 'Sprunkiphase',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C01VWXR0LG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C01VWXR0LG');
          `}
        </Script>
      </head>
      <body 
        className={`
          ${spaceGrotesk.variable} 
          ${inter.variable} 
          ${jetbrainsMono.variable} 
          font-body 
          bg-background
        `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
