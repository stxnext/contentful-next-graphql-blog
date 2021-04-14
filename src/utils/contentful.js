import gql from "graphql-tag";
import apolloClient from "./apollo-client";

export async function getPosts() {
  const { data } = await apolloClient.query({
    query: gql`
      query Posts {
        postCollection {
          items {
            title
            subtitle
            author
            slug
          }
        }
      }
    `,
  });
  return data.postCollection.items;
}

export default { getPosts };
