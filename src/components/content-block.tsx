import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
