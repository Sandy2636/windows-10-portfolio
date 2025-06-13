// // src/app/blog/[slug]/page.tsx
// import { getPostData, getAllPostSlugs } from "@/lib/blog";
// import { notFound } from "next/navigation";
// import { getMDXComponent } from "mdx-bundler/client";
// import { useMemo } from "react";
// import Head from "next/head"; // For older Next.js, now use generateMetadata

// // For SEO metadata
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const post = await getPostData(params.slug);
//   if (!post) {
//     return { title: "Post Not Found" };
//   }
//   return {
//     title: post.frontmatter.title,
//     description: post.frontmatter.description,
//     openGraph: {
//       title: post.frontmatter.title,
//       description: post.frontmatter.description,
//       type: "article",
//       publishedTime: post.frontmatter.date,
//       authors: ["Your Name"], // Add your name
//       tags: post.frontmatter.tags,
//     },
//     // Add JSON-LD structured data here
//   };
// }

// // For Static Site Generation (SSG)
// export async function generateStaticParams() {
//   const paths = getAllPostSlugs(); // This needs to return { slug: string }[]
//   return paths.map((p) => ({ slug: p.params.slug }));
// }

// export default async function BlogPostPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const post = await getPostData(params.slug);

//   if (!post) {
//     notFound(); // Triggers 404 page
//   }

//   const Component = useMemo(() => getMDXComponent(post.code), [post.code]);

//   // Basic Notepad styling for the direct blog page
//   return (
//     <article className="max-w-2xl mx-auto p-4 font-mono bg-[#f0f0f0] text-black">
//       {/* JSON-LD Script for SEO */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BlogPosting",
//             headline: post.frontmatter.title,
//             description: post.frontmatter.description,
//             datePublished: post.frontmatter.date,
//             author: {
//               "@type": "Person",
//               name: "Your Name", // Replace with your name
//             },
//             // Add image, publisher, etc.
//           }),
//         }}
//       />

//       <header className="mb-4 border-b border-gray-400 pb-2">
//         <h1 className="text-2xl font-bold">{post.frontmatter.title}</h1>
//         <p className="text-sm text-gray-600">
//           Published on: {new Date(post.frontmatter.date).toLocaleDateString()}
//         </p>
//         {post.frontmatter.tags && (
//           <div className="mt-1">
//             {post.frontmatter.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="text-xs bg-gray-300 px-1 py-0.5 mr-1 rounded"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </header>
//       <div className="prose prose-sm max-w-none">
//         {" "}
//         {/* Use Tailwind Typography for MDX styling */}
//         <Component />
//       </div>
//     </article>
//   );
// }

import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const BlogPage = ({ params }: Props) => {
  return <div>Blog Slug: {params.slug}</div>;
};

export default BlogPage;
