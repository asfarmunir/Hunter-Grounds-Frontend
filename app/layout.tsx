import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "react-hot-toast";
import AuthSessionProvider from "@/lib/AuthProvider";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Hunt Grounds",
  description:
    " Hunt Grounds is a platform that allows you to find the best hunting grounds in your area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <GoogleTagManager gtmId="GTM-5FRDZPFS" />
      <body className={lexend.variable}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FRDZPFS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <AuthSessionProvider>
          <NextTopLoader
            color="orange"
            initialPosition={0.08}
            crawlSpeed={200}
            height={2}
            showSpinner={false}
            crawl={true}
            easing="ease"
            speed={200}
            shadow="0 0 5px #2299DD,0 0 5px #2299DD"
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-center" />
          </ThemeProvider>
          {/* <Toaster position="bottom-center" /> */}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
