import Link from "next/link";

const linkStyles =
  "px-5 hover:scale-105 font-light  bg-black/15 hover:bg-black/25  m-3 p-1";

export default function MarketingHeader() {
  return (
    <header
      className="flex border-b border-white/10 items-center 
     bg-[#3573d7] text-white font-light justify-end px-4"
    >
      <Link className={linkStyles} href={"/signup"}>
        New User
      </Link>
      <Link className={linkStyles} href={"/login"}>
        Sign In
      </Link>
    </header>
  );
}
