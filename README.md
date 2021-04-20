## Prerequisites

- Node.js
- npm
- Terraform (only for deployments)

## Installation

In the root of the project run below command.
```bash
$ npm install
```

After that create __.env.local__ file in the root of the project and fill it with enviroment variables. You can find their names inside __.env.local.example__

## Running the app
```bash
$ npm run dev
```

## Deployment

Build project with below command
```bash
$ npm run tf-next
```

After build run set of following commands

```bash
$ export AWS_ACCESS_KEY_ID="your-access-key-id"
$ export AWS_SECRET_ACCESS_KEY="your-secret-access-key"

$ terraform init    # Only needed on the first time running Terraform

$ terraform plan    # (Optional) See what resources Terraform will create
$ terraform apply   # Deploy the Next.js app to your AWS account
```

## Acknowledgements
* [terraform-aws-next-js](https://github.com/dealmore/terraform-aws-next-js)

---

# Compose Contentful with Next.js via GraphQL API

Make use of one of the best headless CMS service and great technologies such as Next.js and GraphQL to create blog website.

## Headless CMS

Back in the days when we wanted to create a blog website, we probably would use some classical CMS (Content Management System) like WordPress. It is a really powerful tool that allows a non-technical person to create a website from the beginning to the end, and after all to manage it well. That's because, besides the possibility of creating content, we can also produce a user interface without writing any single line of code. It is a great approach. However, if we would like to add some more dynamic features, it would become a nightmare. Additionally, if you don't want to use templates because you want to create a unique website, you should consider another solution.

Headless CMS gives us much more flexibility than classical CMS. The main difference between those two approaches is that headless CMS doesn't take part in designing and returning UI of the website, but it only returns pure content, for example in JSON format. This enables us to create a custom frontend with the use of any framework we want. Such flexibility is also needed when we want to build a scalable solution, not dependant on many limitations that WordPress undoubtedly has.

## Contentful

This is one of the best and most popular headless CMS product on the market. It gives us two main admin interfaces (GUI) for creating:

- models (like in a normal database),
- content entries (for content creators).

With such features, we don't even need any specific knowledge about backend services to kick off our project.

Contentful exposes two types of APIs to fetch our content data: REST API and GraphQL API.

## GraphQL

I've chosen this option for the sake of the flexibility of this approach. At the roots, GraphQL is just a specification which defines query language for predictable data transfer across web network. In my opinion, GraphQL creates the most possible pleasant experience for interacting with API and that's the reason why his popularity over the last years is growing so fast. In the example that I'm going to present I used Apollo Client, which is a client-side library for fetching data from the GraphQL server. It is also a state management library, but this topic is just out of the scope of this article and you can read more about it [here](https://www.apollographql.com/docs/react/ "Apollo Client documentation").

## Next.js

In the previous sections, I've used few times the word flexibility. And it ain't going to stop here, because Next.js is the most flexible React framework out there. It lets us easily create full-stack web applications thanks to the Node.js server that we get out of the box. But still, the most impressive thing in this framework is the straightforward way of switching between rendering modes. We can easily point to a component that is statically rendered and tell another to use server-side rendering. And if the two previous approaches still don't meet our requirements, then we can use client-side rendering like in a typical single-page application. However, when we are talking about creating a blog, we should always remember that client-side rendering has a very negative effect on the SEO of any website.

### Prerequisites

Before you start, you need to ensure that you have:

- Contentful account
- Node.js installed on your computer

### Contentful setup

After login, go to the *Content model* dashboard and click on *Add content type*. My *Post* model looks like this.

![contentful-setup-1](http://images.ctfassets.net/0sdt661c42qh/2MGTZH2i4uycLrKopsTIoV/3fa0517f2007bfbffab35aefe0448ae1/Screenshot_2021-04-20_at_10.53.44.png)

Then you can go to the *Content* dashboard to create few entries.

![contentful-setup-2](http://images.ctfassets.net/0sdt661c42qh/6ioFQvTpvfcIHMI6sXtAvx/f652a9054606863d9cfb311414b203bd/Screenshot_2021-04-20_at_10.51.28.png)

After, it is possible to open GraphQL Playground inside your Contentful account. Go to the *Apps* dashboard and install GraphQL Playground. Notice, that we created our robust and ready-to-go GraphQL API in only a few clicks!

![contentful-setup-3](http://images.ctfassets.net/0sdt661c42qh/6EW8xTN38RtGTeRVvkAigr/6c1240afc4a4124dcfd92cd25670bfb6/Screenshot_2021-04-20_at_10.59.22.png)

### Next.js setup

The most preferred way to init Next.js project is to use the create-next-app CLI tool. So let's start with it.

```bash
$ npx create-next-app
```

And we are ready to go! Run the below command to start the development server, switch to a browser window, and type in *http://localhost:3000/*. You probably going to see some basic project layout.

```bash
$ npm run start
```

### Apollo Client inside Next.js project

We need to query our GraphQL Contentful API. First of all, install the following dependencies.

```bash
$ npm install graphql @apollo/client apollo-link apollo-link-http
```

Create a new file in the project root called *.env.local* where we will store environment variables.

```javascript
/// .env.local

CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
```

Swap mocked values for your real secrets. You can take them from the Contentful Settings dashboard.

![apollo-client-setup](http://images.ctfassets.net/0sdt661c42qh/3hZ5fTRwzCHGW5K8Nr0pJ2/16caa947c9661f1ab36cfa34f960a043/Screenshot_2021-04-20_at_12.11.05.png)

In the end, create *src/utils/apollo-client.js* file.

```javascript
/// src/utils/apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const SPACE = process.env.CONTENTFUL_SPACE_ID;
const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}`;

const http = new HttpLink({
  uri: URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const link = ApolloLink.from([http]);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link,
  cache,
});

export default apolloClient;
```

Now we are ready to create our first query to Contentful GraphQL API!

### Fetch data from Contentful

For this blog project, I have only needed two queries. One of them is for fetching all blog posts to display a list of them on the main page. The second one was made to get a single post by its slug. I placed them inside *src/utils/contentful.js*.

```javascript
/// src/utils/contentful.js

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
```

Now you can use those functions either on the client or server-side!

## Summary

As you could see, combining all these technologies is not much of a problem. I think this mix gives us the possibility to build a great website that requires some CMS behind it. Using such systems as Contentful just making our developers live easier.

You can find the project repository on GitHub under this [link](https://github.com/DavidSolomon22/it-blog-next).
