import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ReduxProvider } from "./reduxProvider";
const roboto = Poppins({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--poppins",
});

export const metadata: Metadata = {
  title: "Stay Way",
  description:
    "Stay Way — your easy and reliable platform to book hotels and apartments worldwide. Quickly find and reserve the perfect accommodation at the best price with secure booking and 24/7 customer support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
