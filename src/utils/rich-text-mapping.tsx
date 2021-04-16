import { BLOCKS, MARKS } from "@contentful/rich-text-types";

const Bold = ({ children }) => <p style={{ color: "red" }}>{children}</p>;
const Italic = ({ children }) => <p style={{ color: "green" }}>{children}</p>;

export const singlePostOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, s) => {
      console.log(node);
      console.log(s);
      return <div>{node.content[0].value}</div>;
    },
  },
};

export default { singlePostOptions };
