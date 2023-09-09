import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/utils/merge";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex h-screen items-center w-full flex-col p-5"
        )}
      >
        <div className="max-w-xl py-18 gap-12 w-full">
          <Header />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
