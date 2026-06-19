import useProfile from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import { useRef } from "react";
import useApi from "../../hooks/useApi";
import actions from "../../actions";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useApi();
  const fileUploadRef = useRef(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const displayImage = async (e) => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const formData = new FormData();

      for (const file of e.target.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `/profile/${state?.user?.id}/avatar`,
        formData,
      );

      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
      }
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: err.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full max-h-[180px] rounded-full lg:max-h-[218px] "
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName + " " + state?.user?.lastName}
      />

      <form onSubmit={(e) => handleImageUpload(e)}>
        <button
          type="submit"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input
          onChange={(e) => displayImage(e)}
          type="file"
          ref={fileUploadRef}
          hidden
        />
      </form>
    </div>
  );
};

export default ProfileImage;
