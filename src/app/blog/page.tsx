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
