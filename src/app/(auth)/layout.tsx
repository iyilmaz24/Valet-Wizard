import Logo from "@/components/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-y-5 justify-center items-center">
      <Logo />
      {children}
    </div>
  );
}
