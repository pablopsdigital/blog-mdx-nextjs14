"use client";

import { Post } from "contentlayer/generated";
import { slug } from "github-slugger";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "../tag";

interface HeaderProps {
  post: Post;
}

export const Header: React.FC<HeaderProps> = ({ post }) => {
  return (
    <header className="w-full mt-5 py-4 flex items-center justify-between ">
      <div className="w-full inline-block">
        <article className="flex flex-col items-start justify-end relative h-[60vh] sm:h-[85vh]">
          <div
            className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-black/80 rounded-3xl z-0
            "
          />
          <Image
            src={`${post.coverImage?.filePath.replace("../public", "")}`}
            placeholder="blur"
            blurDataURL={post.coverImage?.blurhashDataUrl}
            alt={post.title}
            fill={true}
            className="w-full h-full object-center object-cover rounded-3xl -z-10"
            sizes="100vw"
            priority
          />

          <div className="sm:w-full md:w-3/4 lg:w-2/4 mb-20 p-16 flex flex-col items-start justify-center z-0 capitalize text-white">
            <div className="flex gap-3">
              {post.tags?.map((tag: string, index: number) => (
                <Tag
                  key={tag}
                  link={`${
                    post.tags
                      ? `/categories/${slug(post.tags[0])}`
                      : "Uncategorized"
                  }`}
                  name={tag}
                />
              ))}
            </div>

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

            <p className="inline-block mt-4 text-l font-thin">
              {post.description}
            </p>
          </div>
        </article>
      </div>
    </header>
  );
};
