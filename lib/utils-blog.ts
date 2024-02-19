import { Post } from "@/.contentlayer/generated";
import { compareDesc } from "date-fns";

export const sortPosts = (allPosts: Post[]) => {
  const postsorder = allPosts.sort((a, b) =>
    compareDesc(new Date(a.publishDate), new Date(b.publishDate))
  );

  return postsorder;
};
