import { cn } from "@/lib/utils";
import Link from "next/link";

type TagProps = {
  link?: string;
  name?: string;
  className?: string;
};

export const Tag: React.FC<TagProps> = ({ link = "#", name, ...props }) => {
  return (
    <Link
      href={link}
      className={cn(
        "bg-slate-500 px-10 py-2 rounded-full capitalize font-semibold hover:bg-slate-600",
        props.className
      )}
    >
      {name}
    </Link>
  );
};
