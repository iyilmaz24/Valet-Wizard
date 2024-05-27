import Image from "next/image";
import preview from "/public/placeholderImg.jpeg";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#c14a4a] text-white/75 min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image src={preview} alt="ValetWizard preview" width={520} height={470} />

      <div className="flex flex-col items-center max-w-[500px]">
        <span className="w-full flex justify-center xl:justify-start">
          <Logo />
        </span>
        <h1 className="text-3xl lg:text-4xl font-semibold my-6 text-center xl:text-left">
          <span className="font-extrabold">ValetWizard</span> helps manage your
          valet parking business.
        </h1>
        <p className="text-lg lg:text-xl font-medium text-center xl:text-left">
          Get our software set-up and ready to make you more successful within
          minutes.
        </p>
        <div className="w-full mt-10 space-x-3 flex justify-center xl:justify-start">
          <Button asChild>
            <Link href={"/signup"}>Get Started</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
