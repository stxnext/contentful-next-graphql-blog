import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { getAllPosts } from "../src/utils/contentful";
import PostOverview from "../src/components/PostOverview";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostsContainer>
        {posts.map((post) => (
          <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
            <a>
              <PostOverview title={post.title} />
            </a>
          </Link>
        ))}
      </PostsContainer>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

const Site = styled.div``;

const Header = styled.div``;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
