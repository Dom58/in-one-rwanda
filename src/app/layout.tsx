import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import { Provider } from "@/components/common/Provider";
import "@/app/globals.css";

const poppins = Poppins({
  preload: true,
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressContentEditableWarning>
        <Provider>
          <Suspense> {children}</Suspense>
        </Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "All in one Finder",
  description: "Search and find important data efficiently and securely.",
};
