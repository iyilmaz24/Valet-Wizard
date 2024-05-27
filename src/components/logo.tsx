import Image from "next/image";
import logo from "/public/placeholderImg.jpeg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="ValetWizard logo" width={50} height={50} />
    </Link>
  );
}
