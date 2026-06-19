import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import actions from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";

const ProfilePage = () => {
  const { api } = useApi();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) return <p>Fetching your data...</p>;

  if (state?.error) return <p>{state?.error?.message}</p>;

  return (
    <div>
      <ProfileInfo />
      <div className="w-full border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfilePage;
