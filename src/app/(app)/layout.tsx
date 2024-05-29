import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundPattern from "@/components/background-pattern";
import CarContextProvider from "@/contexts/car-context-provider";
import { Car } from "@/lib/types";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await prisma.car.findMany();
  console.log(data);

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
    </>
  );
}
