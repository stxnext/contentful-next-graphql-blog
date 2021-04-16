import Image from "next/image";

const ImageMarkdown = ({ src }) => {
  return <Image src={`https:${src}`} width={900} height={600} />;
};

export default ImageMarkdown;
