import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "Trendy Kotha",
  description: "A trendy blog for tech enthusiasts.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <AuthProvider>
        {children}
      </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,

            style: {
              background: "#F5EFE3",
              color: "#51443A",
              border: "1px solid #C8A96B",
              padding: "16px",
              borderRadius: "16px",
              fontFamily: "var(--font-inter)",
            },

            success: {
              iconTheme: {
                primary: "#8B5A2B",
                secondary: "#F5EFE3",
              },
            },

            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#F5EFE3",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
