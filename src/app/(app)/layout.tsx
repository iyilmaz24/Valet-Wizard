import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundPattern from "@/components/background-pattern";
import CarContextProvider from "@/contexts/car-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await prisma.car.findMany();

  return (
    <>
      <BackgroundPattern />

      <div className="flex flex-col max-w-[90%] min-h-screen mx-auto">
        <Header />

        <CarContextProvider data={data}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </CarContextProvider>

        <Footer />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
