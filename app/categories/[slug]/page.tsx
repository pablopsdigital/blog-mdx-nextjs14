import { Post, allPosts } from "@/.contentlayer/generated";
import { Categories } from "@/app/components/Blog/Categories";
import { RecentPostLayout } from "@/app/components/Home/recent-post-layout";
import GithubSlugger, { slug } from "github-slugger";
import React from "react";

const slugger = new GithubSlugger();

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const categories: string[] = [];
  const paths = [{ slug: "all" }];

  allPosts.map((post: Post) => {
    if (post.isPublished) {
      post.tags.map((tag: string) => {
        let slugified = slugger.slug(tag);

        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths.sort();
}

export async function generateMetadata({ params }: { params: Params }) {
  return {
    title: `${params.slug.replaceAll("-", " ")} Blogs`,
    description: `Learn more about ${
      params.slug === "all" ? "web development" : params.slug
    } through our collection of expert blogs and tutorials`,
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const allCategories = ["all"];
  const blogs = allPosts.filter((post: Post) => {
    return post.tags.some((tag: string) => {
      const slugified = slug(tag);

      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }

      if (params.slug === "all") {
        return true;
      }

      return slugified === params.slug;
    });
  });

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className=" px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          #{params.slug}
        </h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={params.slug} />

      <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs.map((post: Post, index: number) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <RecentPostLayout post={post} />
          </article>
        ))}
      </div>
    </article>
  );
};

export default CategoryPage;
