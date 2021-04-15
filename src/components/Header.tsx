import styled from "styled-components";
import Image from "next/image";

const Header = () => {
  return (
    <Container>
      <Image src="/logo.svg" height={100} width={100} />
      <HeaderTitle>IT BLOG</HeaderTitle>
      <SubHeaderTitle>Made by David Solomon</SubHeaderTitle>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #e6e6e6;
`;

const HeaderTitle = styled.div`
  color: #000000;
  font-size: 27px;
  font-weight: 700;
  font-family: medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  padding: 0 1rem;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #e6e6e6;
`;

const SubHeaderTitle = styled.div`
  padding: 0 1rem;
  font-weight: 400;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
`;
