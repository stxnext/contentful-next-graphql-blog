import gql from "graphql-tag";
import apolloClient from "./apollo-client";

export async function getAllPosts() {
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllPosts {
        postCollection {
          items {
            title
            subtitle
            sys {
              publishedAt
            }
            slug
            image {
              url
            }
          }
        }
      }
    `,
  });
  return data.postCollection.items;
}

export async function getPostBySlug(slug) {
  const { data } = await apolloClient.query({
    query: gql`
      query GetPostBySlug($slug: String!) {
        postCollection(where: { slug: $slug }) {
          items {
            title
            subtitle
            sys {
              publishedAt
            }
            image {
              url
            }
            content
            rtContent {
              json
            }
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });
  return data.postCollection.items[0];
}

export default { getAllPosts, getPostBySlug };
