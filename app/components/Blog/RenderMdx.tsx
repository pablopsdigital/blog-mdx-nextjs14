"use client";

import { Post } from "@/.contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

interface RenderMdxProps {
  post: Post;
}

const mdxComponents = {
  Image,
};

export const RenderMdx: React.FC<RenderMdxProps> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div
      className="col-span-8 font-in prose prose-lg max-w-max 
      prose-blockquote:bg-accent/20 prose-blockquote:p-2 prose-blockquote:px-5 
      prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:rounded-r-lg
      prose-li:marker:text-accent prose-li:marker:font-bold"
    >
      {post ? <MDXContent components={mdxComponents} /> : <p>No content</p>}
    </div>
  );
};
