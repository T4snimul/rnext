import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const PostCard = ({ post, actionId, handleShowActions }) => {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader
        post={post}
        actionId={actionId}
        onShowActions={handleShowActions}
      />
      <PostBody poster={post?.image} content={post?.content} />
      <PostActions commentCount={post?.comments?.length} />
    </article>
  );
};

export default PostCard;
