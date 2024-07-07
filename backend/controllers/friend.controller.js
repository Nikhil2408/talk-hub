import User from "../models/user.model.js";

export const addFriend = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const friendUserId = req.params.friendId;

    await User.updateOne(
      { _id: friendUserId },
      { $push: { friendRequests: loggedInUserId } }
    );

    await User.updateOne(
      { _id: loggedInUserId },
      { $push: { friendRequestsSent: friendUserId } }
    );

    res.status(200).json({ message: "Friend request sent successfully!" });
  } catch (error) {
    console.log("Error while sending friend request", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptFriend = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const acceptFriendUserId = req.params.friendId;

    const result = await User.updateOne(
      { _id: acceptFriendUserId },
      {
        $push: { friends: loggedInUserId },
        $pull: { friendRequestsSent: loggedInUserId },
      }
    );

    const result1 = await User.updateOne(
      { _id: loggedInUserId },
      {
        $push: { friends: acceptFriendUserId },
        $pull: { friendRequests: acceptFriendUserId },
      }
    );
    res.status(200).json({ message: "Friend Request Accepted" });
  } catch (error) {
    console.log("Error while accepting friend request", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
