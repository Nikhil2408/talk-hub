import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).populate("friends");

    if (!user) {
      res.status(400).json({ error: "User not found" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ error: "Invalid Password" });
      } else {
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
          friends: user.friends,
          friendRequests: user.friendRequests,
          friendRequestsSent: user.friendRequestsSent,
        });
      }
    }
  } catch (e) {
    console.log("Error while logging in user", e.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    console.log("Error while logging out user", e.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
      friends: newUser.friends,
      friendRequests: newUser.friendRequests,
      friendRequestsSent: newUser.friendRequestsSent,
    });
  } catch (e) {
    console.log("Error while creating user", e.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getAuthUser = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const authUser = await User.findOne({ _id: loggedInUserId })
      .populate("friends")
      .populate("friendRequests");
    res.status(200).json(authUser);
  } catch (error) {
    console.log("Error while fetching the auth User details", error.message);
    res.state(500).json({ error: "Internal Server Error" });
  }
};
