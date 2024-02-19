import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const FeaturedPostLayoutTwo: React.FC<{ post: Post }> = ({ post }) => {
  //TODO: Revisar articulos slug
  // const slug = convertTitleToSlug(post.title);

  return (
    <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light">
      <Link
        href={post.slug}
        className=" col-span-12  lg:col-span-4 h-full rounded-xl overflow-hidden"
      >
        <Image
          src={`${post.coverImage?.filePath.replace("../public", "")}`}
          placeholder="blur"
          blurDataURL={post.coverImage?.blurhashDataUrl}
          alt={post.title}
          width={post.coverImage?.width}
          height={post.coverImage?.height}
          className="aspect-square w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="col-span-12  lg:col-span-8 w-full">
        <span className="inline-block w-full capitalize text-gray-500 text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {`${post.tags ? post.tags[0] : "Uncategorized"}`}
        </span>

        <Link href={post.slug} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50 bg-[length:0px_2px]
                group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {post.title}
            </span>
          </h2>
        </Link>

        <span className="inline-block w-full capitalize text-gray dark:text-light/50 font-semibold  text-xs sm:text-base">
          {format(new Date(post.publishDate), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};
