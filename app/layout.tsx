import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import NavbarWrapper from "./components/NavbarWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hirevexa | Launch Your Career",
  description: "Professional career consultancy and job placement services for freshers",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavbarWrapper />
          {children}
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}