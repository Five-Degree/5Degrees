import Navbar from "@/components/Navbar/Navbar";
import AOSInit from "@/components/Utility/AOSInit";
import ThemeClient from "@/components/Utility/ThemeClient";
import { AuthContextProvider } from "@/contexts/AuthContext";
import CartContextProvider from "@/contexts/CartContext";
import ResponsiveContextProvider from "@/contexts/ResponsiveContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Alumni_Sans, Bebas_Neue } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import InstantSearchProvider from "@/components/Utility/InstantSearchProvider";

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
  title: { template: "%s | 5 Degrees", default: "5 Degrees" },
  description: "Discover without limitations, the odd and superior cart.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${alumniSans.variable} ${bebasNeue.variable}`}>
        {/* Auth context containing user */}
        <AuthContextProvider>
          {/* mui app router context */}
          <AppRouterCacheProvider>
            {/* theme context to allow toggling the theme from light to dark... */}
            <ThemeContextProvider>
              {/* mui theme provider client version cause fucking use client is trash*/}
              <ThemeClient>
                {/* Screen Responsive size provider */}
                <ResponsiveContextProvider>
                  {/* Cart Provider */}
                  <CartContextProvider>
                    {/* Animation on scroll provider */}
                    <AOSInit />
                    <Navbar />
                    {/* Top loading bar component */}
                    <NextTopLoader showSpinner={false} color="var(--accent)" />
                    {children}
                  </CartContextProvider>
                </ResponsiveContextProvider>
              </ThemeClient>
            </ThemeContextProvider>
          </AppRouterCacheProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
