import Image from "next/image";
import logo from "/public/logoImage.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        className="rounded-full"
        src={logo}
        alt="ValetWizard logo"
        width={50}
        height={50}
      />
    </Link>
  );
}
