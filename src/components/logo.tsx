import Image from "next/image";
import logo from "/public/logoImage.png";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <Image
        className={cn("rounded-full", className)}
        src={logo}
        alt="ValetWizard logo"
        width={65}
        height={65}
      />
    </Link>
  );
}
