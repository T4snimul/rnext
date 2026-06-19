import { useEffect, useReducer } from "react";
import { initialState, postReducer } from "../reducers/postReducer";
import useApi from "../hooks/useApi";
import actions from "../actions";
import PostsList from "../components/posts/PostsList";

const HomePage = () => {
  const { api } = useApi();
  const [state, dispatch] = useReducer(postReducer, initialState);

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get("/posts");

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (err) {
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: err.message });
      }
    };

    fetchPost();
  }, []);

  if (state?.loading) return <div>We are working...</div>;
  if (state?.error) return <div>{state?.error}</div>;

  return (
    <div>
      <PostsList posts={state?.posts} />
    </div>
  );
};

export default HomePage;
