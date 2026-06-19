import useProfile from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import useApi from "../../hooks/useApi";
import { useState } from "react";
import actions from "../../actions";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const { api } = useApi();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(state?.user?.bio);

  const handleBioEdit = async () => {
    if (!editMode) setEditMode(true);
    else {
      // save bio
      dispatch({ type: actions.profile.DATA_FETCHING });

      try {
        const response = await api.patch(`/profile/${state?.user?.id}`, {
          bio,
        });

        if (response.status === 200) {
          dispatch({
            type: actions.profile.USER_DATA_EDITED,
            data: response.data,
          });

          setEditMode(false);
        }
      } catch (err) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: err.message,
        });
      }
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="text-gray-600"
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>

      <button
        className="flex-center h-7 w-7 rounded-full"
        disabled={state?.loading}
        onClick={handleBioEdit}
      >
        <img
          src={editMode ? CheckIcon : EditIcon}
          alt={editMode ? "Done" : "Edit"}
        />
      </button>
    </div>
  );
};

export default Bio;
