import toast from "react-hot-toast";

export const addFriend = async (setIsLoading, friendId) => {
  setIsLoading(true);
  try {
    const responseObj = await fetch(`/api/friend/addFriend/${friendId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const response = await responseObj.json();
    toast.success(response.message);
    return true;
  } catch (error) {
    toast.error("Failed to add as friend, please try again!");
  } finally {
    setIsLoading(false);
  }
};
