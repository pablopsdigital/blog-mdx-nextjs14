import { allPosts } from "@/.contentlayer/generated";
import { BlogDetails } from "@/app/components/Blog/BlogDetails";
import { RenderMdx } from "@/app/components/Blog/RenderMdx";
import { Tag } from "@/app/components/tag";
import { siteMetadata } from "@/lib/utils-site-metadata";
import { slug } from "github-slugger";
import Image from "next/image";

type HeadingType = {
  level: "one" | "two" | "three";
  text: string;
  slug: string;
};

export async function generateStaticParams() {
  return allPosts.map((blog) => ({ slug: blog._raw.flattenedPath }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!post) {
    return;
  }

  const publishedAt = new Date(post?.publishDate).toISOString();
  const modifiedAt = new Date(
    post?.updatedDate || post?.publishDate
  ).toISOString();

  let imageList: string[] = [siteMetadata.socialBanner];

  if (post.coverImage) {
    if (typeof post.coverImage === "string" || Array.isArray(post.coverImage)) {
      const coverImages = Array.isArray(post.coverImage)
        ? post.coverImage
        : [post.coverImage];

      imageList = coverImages.map((img) => {
        if (typeof img === "string") {
          return siteMetadata.siteUrl + img;
        } else if (img.filePath && typeof img.filePath === "string") {
          return siteMetadata.siteUrl + img.filePath;
        } else {
          return "";
        }
      }) as string[];
    }
  }

  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
  });

  const authors = post?.author ? [post.author] : siteMetadata.author;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: siteMetadata.siteUrl + post.slug,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImages,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) {
    return null;
  }

  return (
    <article>
      <div className="mb-8 mt-8 text-center relative w-full h-[60vh] bg-dark rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/80 rounded-3xl z-0" />
        <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Tag name={post.tags[0]} link={`/categories/${slug(post.tags[0])}`} />
          <h1 className="inline-block mt-6 font-semibold capitalize text-light text-5xl leading-normal relative w-5/6">
            {post?.title}
          </h1>
        </div>
        <Image
          src={`${post?.coverImage?.filePath.replace("../public", "")}`}
          placeholder="blur"
          blurDataURL={post?.coverImage?.blurhashDataUrl}
          alt={`${post?.title}`}
          width={post?.coverImage?.width}
          height={post?.coverImage?.height}
          className="aspect-square w-full h-full object-cover object-center"
        />
      </div>

      <BlogDetails post={post} slug={post?.slug} />

      <div className="grid grid-cols-12 gap-16 mt-8 px-10">
        <div className="col-span-4">
          <details
            className="border-[1px] border-solid border-dark text-dark rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
            open
          >
            <summary className="text-lg font-semibold capitalize cursor-pointer">
              Table of Content
            </summary>
            <ul className="mt-4 font-in text-base">
              {post.toc.map((heading: HeadingType) => (
                <li key={heading.text} className="py-1">
                  <a
                    href={`#${heading.slug}`}
                    data-level={heading.level}
                    className="data-[level=two]:pl-0  data-[level=two]:pt-2
                              data-[level=two]:border-t border-solid border-dark/40
                              data-[level=three]:pl-4
                              sm:data-[level=three]:pl-6
                              flex items-center justify-start
                              "
                  >
                    {heading.level === "three" ? (
                      <span className="flex w-1 h-1 rounded-full bg-dark mr-2">
                        &nbsp;
                      </span>
                    ) : null}

                    <span className="hover:underline">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <RenderMdx post={post} />
      </div>
    </article>
  );
}
