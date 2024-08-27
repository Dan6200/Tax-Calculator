import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nigerian Tax Calculator",
  description:
    "A calculator to aid in calculating your taxes according to the Nigerian tax system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container p-8 sm:p-24">
          <h1 className="font-semibold text-3xl text-center mb-16">
            Nigerian Tax Calculator
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
}
