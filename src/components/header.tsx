"use client";

import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Dashboard",
    path: "/valet/dashboard",
  },
  {
    name: "Account",
    path: "/valet/account",
  },
];

export default function Header() {
  const activePathName = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex gap-2">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                className={cn(
                  `text-white/70  rounded-sm
                px-2 py-1 hover:text-white focus-text-white transition`,
                  {
                    "bg-black/10 text-white": route.path === activePathName,
                  }
                )}
                href={route.path}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
