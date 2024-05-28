import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundPattern from "@/components/background-pattern";
import CarContextProvider from "@/contexts/car-context-provider";
import { Car } from "@/lib/types";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiURL = process.env.API_URL as string;
  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data: Car[] = await response.json();

  return (
    <>
      <BackgroundPattern />

      <div className="flex flex-col max-w-[90%] min-h-screen mx-auto">
        <Header />
        <CarContextProvider data={data}>{children}</CarContextProvider>
        <Footer />
      </div>
    </>
  );
}
