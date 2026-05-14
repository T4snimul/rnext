import { Suspense, useState } from "react";
import "./App.css";
import Comments from "./components/Comments";
import PostSelector from "./components/PostSelector";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleSelectPost = (e) => {
    setSelectedPostId(e.target.value);
  };

  return (
    <div>
      <h1>React Suspense and Error Boundaries</h1>

      <div>
        <ErrorBoundary fallback={<p className="error">Failed Loading Posts</p>}>
          <Suspense fallback={<p>Loading posts...</p>}>
            <PostSelector onSelectPost={handleSelectPost} />
          </Suspense>
        </ErrorBoundary>

        {selectedPostId && (
          <ErrorBoundary
            fallback={<p className="error">Failed Loading Comments</p>}
          >
            <Suspense fallback={<p>Loading comments...</p>}>
              <Comments postId={selectedPostId} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
