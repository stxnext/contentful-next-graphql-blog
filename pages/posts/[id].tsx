import styled from "styled-components";
import Image from "next/image";
import { getPostBySlug } from "../../src/utils/contentful";
import ContentMarkdown from "../../src/components/ContentMarkdown";

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
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <PublicationDate>
          {new Date(publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </PublicationDate>
        <MainImageWrapper>
          <Image src={url} width={900} height={600} />
        </MainImageWrapper>
        <ContentMarkdown content={content} />
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
  margin: 1rem;
  padding: 1rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const MainImageWrapper = styled.div`
  margin-bottom: 3rem;
`;
