import { Post } from "contentlayer/generated";
import { FeaturedPostLayoutOne } from "./featured-post-layout-one";
import { FeaturedPostLayoutTwo } from "./featured-post-layout-two";

interface FeaturedPostProps {
  posts: Post[];
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ posts }) => {
  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
        Featured Posts
      </h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-6  mt-10 sm:mt-16">
        <article className="col-span-2  sxl:col-span-1 row-span-2 relative">
          <FeaturedPostLayoutOne post={posts[1]} />
        </article>

        <article className="col-span-2 sm:col-span-1 row-span-1 relative">
          <FeaturedPostLayoutTwo post={posts[2]} />
        </article>
        <article className="col-span-2 sm:col-span-1 row-span-1 relative">
          <FeaturedPostLayoutTwo post={posts[3]} />
        </article>
      </div>
    </section>
  );
};
