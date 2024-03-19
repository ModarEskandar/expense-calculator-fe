import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryPovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expenses Claculater",
  description: "This is a simple expense calculator application that allows users to manage their expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <QueryProvider><AuthProvider>
      {children}
        </AuthProvider> </QueryProvider>
      
        </body>
    </html>
  );
}
