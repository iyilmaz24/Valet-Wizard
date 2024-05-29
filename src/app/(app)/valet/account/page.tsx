import H1 from "@/components/H1";
import ContentBlock from "@/components/content-block";
import DashboardBranding from "@/components/dashboard-branding";

export default function Page() {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex justify-center items-center">
        Signed in as
      </ContentBlock>
    </main>
  );
}
