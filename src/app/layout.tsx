import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ValetWizard - Service Management System",
  description:
    "ValetWizard is a service management system for valet parking services. Have an easier time onboarding and offboarding your customers at any event. Never lose track of a client's car and personalize their interaction for a more memorable experience all-around!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen text-sm text-zinc-900 bg-[#E5E8EC]`}
      >
        {children}
      </body>
    </html>
  );
}
