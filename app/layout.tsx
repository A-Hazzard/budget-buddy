import type { Metadata } from "next";
import "./globals.css";
import { useEffect } from "react";


export const metadata: Metadata = {
  title: "Budget Buddy",
  description: "Budgetting Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en">
      <body>
        {children}
        
        </body>

      
    </html>
  );
}
