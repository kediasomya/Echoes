import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echoes",
  description: "no sounds , just echoes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={`${inter.className} bg-dark-1 text-light-1`}>
          <Topbar />

            <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container flex-1 flex">
              <div className="w-full max-w-4xl">

                {children}

              </div>
            </section>
            <RightSidebar />
            </main>
         

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}