import { Post } from "@/.contentlayer/generated";
import { format } from "date-fns";
import { slug } from "github-slugger";
import { ViewCounter } from "../../components/view-counter";

import Link from "next/link";

interface BlogDetailsProps {
  post?: Post;
  slug: string;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({
  post,
  slug: blogSlug,
}) => {
  return (
    <div className="px-10 bg-accent text-light py-2 flex items-center justify-around flex-wrap text-xl font-medium rounded-lg">
      {post && (
        <>
          <time>{format(new Date(post.publishDate), "MMMM dd, yyyy")}</time>
          <span>
            <ViewCounter slug={blogSlug} />
          </span>
          <div>{post.readingTime} min reading</div>
          <Link href={`/categories/${slug(post.tags[0])}`} className="m-3">
            #{post.tags[0]}
          </Link>
        </>
      )}
    </div>
  );
};
