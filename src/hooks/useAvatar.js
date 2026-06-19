import useProfile from "./useProfile";

const useAvatar = (post) => {
  const { state } = useProfile();

  const isMe = state?.user?.id === post?.author?.id;
  const avatar = isMe ? state?.user?.avatar : post?.author?.avatar;

  const avatarURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;

  return { avatarURL };
};

export default useAvatar;
