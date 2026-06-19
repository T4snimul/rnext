import useAvatar from "../../hooks/useAvatar";
import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

const PostCard = ({ post, actionId, handleShowActions }) => {
  const { avatarURL } = useAvatar(post);

  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader
        post={post}
        actionId={actionId}
        onShowActions={handleShowActions}
      />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions commentCount={post?.comments?.length} />
      <PostComments avatarURL={avatarURL} comments={post?.comments} />
    </article>
  );
};

export default PostCard;
