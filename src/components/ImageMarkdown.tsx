import Image from "next/image";
import styled from "styled-components";

const ImageMarkdown = ({ src }) => {
  return (
    <ImageWraper>
      <Image src={`https:${src}`} width={900} height={600} />
    </ImageWraper>
  );
};

export default ImageMarkdown;

const ImageWraper = styled.div`
  margin: 3rem 0;
`;
