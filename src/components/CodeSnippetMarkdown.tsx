import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeSnippetMarkdownProps {}

const CodeSnippetMarkdown = ({
  children: {
    props: { children: code, className: language },
  },
}) => {
  const formattedLangName = language.substring(5);
  return (
    <SyntaxHighlighterWrapper>
      <SyntaxHighlighter language={formattedLangName}>{code}</SyntaxHighlighter>
    </SyntaxHighlighterWrapper>
  );
};

export default CodeSnippetMarkdown;

const SyntaxHighlighterWrapper = styled.div`
  margin-bottom: 1.5rem;
`;
