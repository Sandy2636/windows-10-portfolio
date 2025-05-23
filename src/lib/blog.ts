// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler"; // if using mdx-bundler
// For simple markdown, you might use 'remark' and 'remark-html'

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as {
        title: string;
        date: string;
        tags?: string[];
        description?: string;
      }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const fullMdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const fullMdPath = path.join(postsDirectory, `${slug}.md`);

  let source;
  let filePath;

  if (fs.existsSync(fullMdxPath)) {
    source = fs.readFileSync(fullMdxPath, "utf8");
    filePath = fullMdxPath;
  } else if (fs.existsSync(fullMdPath)) {
    source = fs.readFileSync(fullMdPath, "utf8");
    filePath = fullMdPath;
  } else {
    return null; // Or throw an error
  }

  const { frontmatter, code } = await bundleMDX({
    source: source,
    cwd: path.join(process.cwd(), "src", "components"), // For MDX components
    // You might need to configure esbuild options for mdx-bundler here
    // especially if using newer JS features in MDX or custom components.
    // Configure XDM options if needed
  });

  return {
    slug,
    frontmatter,
    code,
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.(md|mdx)$/, ""),
    },
  }));
}
