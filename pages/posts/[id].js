import { useRouter } from "next/router";
import {} from "../../src/utils/contentful";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Post: {id} </h1>
    </div>
  );
};

export default Post;
