import toast from "react-hot-toast";

export const acceptFriend = async (acceptFriendUserId, setIsLoading) => {
  setIsLoading(true);
  try {
    const responseObj = await fetch(
      `/api/friend/acceptFriend/${acceptFriendUserId}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    );
    await responseObj.json();
    toast.success("Friend Request Accept");
    return true;
  } catch (error) {
    toast.error(error.error);
  } finally {
    setIsLoading(false);
  }
};
