import { useRouter } from "next/router";
import { getPostBySlug } from "../../src/utils/contentful";

interface PostProps {
  title: string;
  subtitle: string;
  sys: {
    publishedAt: string;
  };
  image: {
    url: string;
  };
  content: string;
}

const Post = ({
  content,
  image: { url },
  subtitle,
  sys: { publishedAt },
  title,
}: PostProps) => {
  return <div></div>;
};

export default Post;

export async function getServerSideProps({ params, req, res }) {
  const { id } = params;
  const post = await getPostBySlug(id);
  return {
    props: {
      ...post,
    },
  };
}
