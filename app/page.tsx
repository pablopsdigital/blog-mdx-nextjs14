import { sortPosts } from "@/lib/utils-blog";
import { allPosts } from "contentlayer/generated";
import { FeaturedPost } from "./components/Home/featured-post";
import { Header } from "./components/Home/header";
import { RecentPost } from "./components/Home/recent-post";

export default function Home() {
  const sortedPosts = sortPosts(allPosts);

  return (
    <main className=" flex flex-col items-center justify-center mx-10 sm:mx-10">
      <Header post={sortedPosts[0]} />
      <FeaturedPost posts={sortedPosts} />
      <RecentPost posts={sortedPosts} />
    </main>
  );
}
