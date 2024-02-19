import { Post } from "contentlayer/generated";
import Link from "next/link";
import { RecentPostLayout } from "./recent-post-layout";

interface RecentPostProps {
  posts: Post[];
}

export const RecentPost: React.FC<RecentPostProps> = ({ posts }) => {
  return (
    <section className="w-full mt-16 sm:mt-24  md:mt-32 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
          Recent Posts
        </h2>
        <Link
          href="/categories/all"
          className="inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2 text-base md:text-lg"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-5">
        {posts.slice(5, posts.length).map((post) => (
          <article key={post.title} className="col-span-1 row-span-1 relative">
            <RecentPostLayout post={post} />
          </article>
        ))}
      </div>
    </section>
  );
};
