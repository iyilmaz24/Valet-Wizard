import MarketingHeader from "./_components/MarketingHeader";
import MarketingFooter from "./_components/MarketingFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  );
}
