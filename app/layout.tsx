import ThemeClient from "@/components/Utility/ThemeClient";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Alumni_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AOSInit from "@/components/Utility/AOSInit";
const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  variable: "--font-as",
  weight: "variable",
});
const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bn",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "5 Degrees",
  description: "Discover limited sneakers without limitations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${alumniSans.variable} ${bebasNeue.variable}`}>
        <AOSInit />
        <ThemeClient>
          <Navbar />
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ThemeClient>
      </body>
    </html>
  );
}
