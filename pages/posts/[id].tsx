import styled from "styled-components";
import Image from "next/image";
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
  return (
    <MainContainer>
      <SubContainer>
        <Title>What’s New In Node.js v15.0.0?</Title>
        <Subtitle>{subtitle}</Subtitle>
        <PublicationDate>
          {new Date(publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </PublicationDate>
        <Image src={url} width={900} height={600} />
        {/* <Content>adf asjdhgfah jgsdfhjkga sd</Content> */}
        <Content>{content}</Content>
      </SubContainer>
    </MainContainer>
  );
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

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: yellow; */
  margin: 1rem;
  padding: 1rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  padding-top: 2rem;
  width: 43rem;
`;

const Title = styled.div`
  font-size: 46px;
  line-height: 56px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.506px;
`;

const Subtitle = styled.div`
  font-size: 22px;
  line-height: 28px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey};
  word-break: break-word;
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  margin: 1rem 0 0;
`;

const PublicationDate = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 14px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  margin: 2rem 0;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 21px;
  line-height: 32px;
  -webkit-font-smoothing: antialiased;
  margin-top: 3rem;
`;
