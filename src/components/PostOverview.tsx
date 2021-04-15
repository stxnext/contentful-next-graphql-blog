import styled from "styled-components";
import Image from "next/image";

interface PostOverviewProps {
  title: string;
  subtitle: string;
  image: string;
  publicationDate: string;
}

const PostOverview = ({
  title,
  subtitle,
  image,
  publicationDate,
}: PostOverviewProps) => {
  return (
    <Container>
      <TextBox>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <PublicationDate>
          {new Date(publicationDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </PublicationDate>
      </TextBox>
      <StyledImage src={image} width={300} height={200} />
    </Container>
  );
};

export default PostOverview;

const TextBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  padding-right: 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50rem;
  margin: 1rem;
  padding: 1rem;
`;

const StyledImage = styled(Image)`
  margin: 5rem;
`;

const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.black};
  font-size: 22px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 56px;
  line-height: 28px;
  -webkit-font-smoothing: antialiased;
`;

const Subtitle = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 16px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 60px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
`;

const PublicationDate = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 14px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
`;
