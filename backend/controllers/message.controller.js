import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const conversationId = conversation._id;

    const newMessage = new Message({
      conversationId,
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await newMessage.save();
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    io.to(receiverSocketId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error while sending message", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  const currentUserId = req.user._id;
  const activeScreenUserId = req.params.id;
  //   const daysRange = parseInt(req.params.daysRange);

  //   const currentDate = new Date();
  //   const currentDateUTC = new Date(currentDate.toISOString());

  //   // Calculate the date 2 days ago in UTC
  //   const previousDate = new Date(currentDate);
  //   previousDate.setUTCDate(currentDate.getUTCDate() - daysRange);
  //   const previousDateUTC = new Date(previousDate.toISOString());

  const conversation = await Conversation.findOne({
    participants: { $all: [currentUserId, activeScreenUserId] },
  });

  if (!conversation) {
    return res.status(200).json({
      messages: [],
    });
  }

  const messages = await Message.find({
    conversationId: conversation._id,
    // createdDate: {
    //   $gte: previousDateUTC,
    // },
  });
  res.status(200).json({
    messages,
  });
};
