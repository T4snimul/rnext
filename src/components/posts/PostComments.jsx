import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

const PostComments = ({ comments, avatarURL }) => {
  return (
    <div>
      <AddComment avatarURL={avatarURL} />

      <CommentsList comments={comments} />
    </div>
  );
};

export default PostComments;
