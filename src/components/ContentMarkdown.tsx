import Markdown from "markdown-to-jsx";
import styled from "styled-components";
import CodeSnippetMarkdown from "./CodeSnippetMarkdown";
import ImageMarkdown from "./ImageMarkdown";

interface ContentMarkdownProps {
  content: string;
}

const ContentMarkdown = ({ content }: ContentMarkdownProps) => {
  return (
    <Markdown
      options={{
        overrides: {
          p: Content,
          img: ImageMarkdown,
          h1: H1,
          h2: H2,
          h3: H3,
          li: Li,
          pre: CodeSnippetMarkdown,
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default ContentMarkdown;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 21px;
  line-height: 32px;
  -webkit-font-smoothing: antialiased;
  margin-bottom: 1.5rem;
`;

const H1 = styled.div`
  font-size: 46px;
  line-height: 56px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.506px;
  margin-bottom: 1.5rem;
`;

const H2 = styled.div`
  font-size: 40px;
  line-height: 49px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.506px;
  margin-bottom: 1.5rem;
`;

const H3 = styled.div`
  font-size: 34px;
  line-height: 41px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.506px;
  margin-bottom: 1.5rem;
`;

const Li = styled.li`
  color: ${({ theme }) => theme.colors.black};
  font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 21px;
  line-height: 32px;
  -webkit-font-smoothing: antialiased;
`;
