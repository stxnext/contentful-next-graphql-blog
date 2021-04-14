import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getPosts } from "../src/utils/contentful";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {posts.map((post) => (
        <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
          <a>
            <strong>{post.title}</strong>
          </a>
        </Link>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
}
