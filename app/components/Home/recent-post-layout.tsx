import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const RecentPostLayout: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="group flex flex-col items-center text-dark dark:text-light">
      <Link href={post.slug} className="h-full rounded-xl overflow-hidden">
        <Image
          src={`${post.coverImage.filePath.replace("../public", "")}`}
          placeholder="blur"
          blurDataURL={post.coverImage?.blurhashDataUrl}
          alt={post.title}
          width={post.coverImage?.width}
          height={post.coverImage?.height}
          className=" aspect-[4/3] w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300 "
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {post.tags[0] ? post.tags[0] : ""}
        </span>
        <Link href={post.slug} className="inline-block my-1">
          <h2 className="font-semibold capitalize  text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50 dark:to-accentDark/50
            bg-[length:0px_2px] group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {post.title}
            </span>
          </h2>
        </Link>

        <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm  sm:text-base">
          {format(new Date(post.publishDate), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};
