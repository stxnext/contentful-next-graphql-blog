import styled from "styled-components";

interface PostOverviewProps {
  title: String;
  subtitle: String;
  author: String;
  slug: String;
  image: String;
}

const PostOverview = ({
  title,
  subtitle,
  author,
  slug,
  image,
}: PostOverviewProps) => {
  return (
    <Container>
      <strong>{title}</strong>
    </Container>
  );
};

export default PostOverview;

const Container = styled.div`
  background: yellow;
`;
