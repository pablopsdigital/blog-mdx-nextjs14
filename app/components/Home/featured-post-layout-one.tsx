import { Post } from "contentlayer/generated";
import { slug } from "github-slugger";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "../tag";

export const FeaturedPostLayoutOne: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="inline-block overflow-hidden rounded-xl h-[400px]">
      <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/80 rounded-3xl z-0" />
      <Image
        src={`${post.coverImage?.filePath.replace("../public", "")}`}
        placeholder="blur"
        blurDataURL={post.coverImage?.blurhashDataUrl}
        alt={post.title}
        fill={true}
        className="aspect-square w-full h-full object-cover object-center rounded-3xl -z-10 group-hover:scale-105 transition-all ease duration-300"
        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
      />

      <div className="w-full absolute bottom-0 p-10 z-20 flex flex-col items-start justify-center  capitalize text-white">
        <Tag
          link={`${
            post.tags ? `/categories/${slug(post.tags[0])}` : "Uncategorized"
          }`}
          name={`${post.tags ? post.tags[0] : "Uncategorized"}`}
          className="px-6 text-sm font-normal py-2"
        />

        <Link href={post.slug} className="mt-6">
          <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
            <span
              className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
          dark:to-accentDark/50 bg-[length:0px_2px]
          hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {post.title}
            </span>
          </h1>
        </Link>
      </div>
    </div>
  );
};
