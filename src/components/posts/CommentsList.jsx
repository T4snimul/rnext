import Comment from "./Comment";
import { useState } from "react";

const CommentsList = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComment = () => {
    setShowComments(!showComments);
  };
  return (
    <>
      {comments.length > 0 && (
        <>
          <div className="mt-4">
            <button
              onClick={handleShowComment}
              className="text-gray-300 max-md:text-sm"
            >
              All Comment ▾
            </button>
          </div>
          {showComments && (
            <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CommentsList;
