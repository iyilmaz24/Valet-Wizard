import Image from "next/image";
import preview from "/public/valetwizard-home.png";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="bg-[#3680f6] text-white/75 min-h-[900px] xl:min-h-[800px] flex flex-col 
    xl:flex-row items-center py-12 xl:py-0 xl:justify-center gap-4 xl:gap-20"
    >
      <div
        style={{
          width: "min(90vw, 450px)",
          height: "min(70vw, 420px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={preview}
          alt="ValetWizard preview"
          sizes="100vw"
          // width={450}
          // height={420}
          objectFit="fill"
          // style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="flex flex-col items-center max-w-[500px]">
        <span className="w-full flex justify-center xl:justify-start">
          <Logo />
        </span>
        <h1
          className="text-2xl lg:text-3xl font-semibold my-5 text-center xl:text-left
        max-w-[80%] lg:max-w-[100%]"
        >
          <span className="font-extrabold">ValetWizard</span> helps manage your
          valet parking business.
        </h1>
        <p
          className="text-lg lg:text-xl font-medium text-center xl:text-left
        max-w-[80%] lg:max-w-[100%]"
        >
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
