import useProfile from "../../hooks/useProfile";
import PostsList from "../posts/PostsList";

const MyPosts = () => {
  const { state } = useProfile();

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostsList posts={state?.posts} />
    </>
  );
};

export default MyPosts;
