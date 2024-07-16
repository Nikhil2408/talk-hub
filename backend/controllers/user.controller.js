import User from "../models/user.model.js";

const isFriendAlready = (userId, loggedInUserFriends) => {
  return loggedInUserFriends.some((friendId) => userId.equals(friendId));
};

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const loggedInUser = await User.findOne({ _id: loggedInUserId });
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password -friends -friendRequests -friendRequestsSent"
    );
    const users = allUsers.filter((userId) => {
      return !isFriendAlready(userId, loggedInUser.friends);
    });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error while fetching all users", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
