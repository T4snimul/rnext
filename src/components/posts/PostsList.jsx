import { useState } from "react";
import PostCard from "./PostCard";

const PostsList = ({ posts }) => {
  const [actionId, setActionId] = useState(null);

  const handleShowActions = (id) => {
    if (id === actionId) setActionId(null);
    else setActionId(id);
  };

  return (
    <>
      {posts?.length > 0 ? (
        posts.map((post) => (
          <PostCard
            actionId={actionId}
            handleShowActions={handleShowActions}
            key={post?.id}
            post={post}
          />
        ))
      ) : (
        <p>No posts here.</p>
      )}
    </>
  );
};

export default PostsList;
