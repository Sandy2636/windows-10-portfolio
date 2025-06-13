import { getPostData, getAllPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { getMDXComponent } from "mdx-bundler/client";

// ✅ SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostData(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["Your Name"],
      tags: post.frontmatter.tags,
    },
  };
}

// ✅ Static Params
export async function generateStaticParams() {
  const slugs: string[] = await getAllPostSlugs(); // e.g., ["first-post", "second-post"]
  return slugs.map((slug) => ({ slug }));
}

// ✅ Main Page Component
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostData(params.slug);
  if (!post) notFound();

  const Component = getMDXComponent(post.code); // ✅ FIXED: use directly

  return (
    <article className="max-w-2xl mx-auto p-4 font-mono bg-[#f0f0f0] text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            datePublished: post.frontmatter.date,
            author: {
              "@type": "Person",
              name: "Your Name",
            },
          }),
        }}
      />
      <header className="mb-4 border-b border-gray-400 pb-2">
        <h1 className="text-2xl font-bold">{post.frontmatter.title}</h1>
        <p className="text-sm text-gray-600">
          Published on: {new Date(post.frontmatter.date).toLocaleDateString()}
        </p>
        {post.frontmatter.tags?.length > 0 && (
          <div className="mt-1">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-300 px-1 py-0.5 mr-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-sm max-w-none">
        <Component />
      </div>
    </article>
  );
}
