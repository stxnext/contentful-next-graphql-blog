import { useRouter } from "next/router";
import { getPostBySlug } from "../../src/utils/contentful";

const Post = ({ post }) => {
  return (
    <div>
      <h1>Post: {post?.slug} </h1>
      <h1>title: {post?.title} </h1>
      <h1>author: {post?.author} </h1>
    </div>
  );
};

export default Post;

export async function getServerSideProps({ params, req, res }) {
  const { id } = params;
  const post = await getPostBySlug(id);
  return {
    props: {
      post,
    },
  };
}
