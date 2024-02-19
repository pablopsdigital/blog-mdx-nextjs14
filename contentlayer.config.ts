import { defineDocumentType, makeSource } from "contentlayer/source-files";
import GithubSlugger from "github-slugger";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Description fiel type",
      required: true,
    },
    // slug: {
    //   type: "string",
    //   description: "Description fiel type",
    //   required: true,
    // },
    description: {
      type: "string",
      description: "Description fiel type",
      required: true,
    },
    coverImage: {
      type: "image",
      description: "Description fiel type",
      required: true,
    },
    isPublished: {
      type: "boolean",
      description: "Description fiel type",
      required: true,
      default: false,
    },
    publishDate: {
      type: "date",
      description: "Description fiel type",
      required: true,
    },
    updatedDate: {
      type: "date",
      description: "Description fiel type",
      required: true,
    },
    author: {
      type: "string",
      description: "Description fiel type",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Description fiel type",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: "string",
      resolve: (post) => {
        // TODO: Existe una libreria llamada reading-time
        const wordsPerMinute = 200;
        const noOfWords = post.body.raw.split(/\s/g).length;
        const minutes = noOfWords / wordsPerMinute;
        const readTime = Math.ceil(minutes);
        return readTime;
      },
    },
    toc: {
      type: "json",
      resolve: async (doc) => {
        const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;

            return {
              level:
                flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          }
        );

        return headings;
      },
    },
  },
}));

const codeOptions = {};

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    // remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
    ],
  },
});
