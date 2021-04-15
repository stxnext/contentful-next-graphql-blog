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
          <Link href="/posts/[id]" as={`/posts/${post.slug}`} passHref>
            <A>
              <PostOverview
                title={post.title}
                image={post.image.url}
                subtitle={post.subtitle}
                publicationDate={post.sys.publishedAt}
              />
            </A>
          </Link>
        ))}
      </PostsContainer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const A = styled.a`
  text-decoration: none;
  color: inherit;
`;
