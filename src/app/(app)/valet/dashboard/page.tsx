import CarDetails from "@/components/car-details";
import CarList from "@/components/car-list";
import ContentBlock from "@/components/content-block";
import DashboardBranding from "@/components/dashboard-branding";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <DashboardBranding />

        <Stats />
      </div>

      <div
        className="grid md:grid-cols-3 md:grid-rows-[45px_1fr]
      grid-rows-[45px_300px_500px] gap-4 md:h-[600px]"
      >
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-1">
          <ContentBlock>
            <CarList />
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <CarDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
