import SignOutButton from "@/app/(auth)/_components/sign-out-button";
import H1 from "@/components/H1";
import ContentBlock from "@/components/content-block";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <H1 className="my-8 text-white ">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col justify-center items-center">
        Signed in as {session.user.email}
        <SignOutButton className="mt-10" />
      </ContentBlock>
    </main>
  );
}
