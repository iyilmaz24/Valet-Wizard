export default function ContentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden">
      {children}
    </div>
  );
}
