import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hirevexa | Launch Your Career",
  description: "Professional career consultancy and job placement services for freshers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Toaster
  position="top-right"
  richColors
  closeButton
/>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
