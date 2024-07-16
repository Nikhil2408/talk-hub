import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { sendMessage } from "./sendMessage";
import { useUserContext } from "../../../context/UserContext";

const SendMessage = () => {
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useUserContext();

  const sendMessageHandler = async () => {
    if (messageText) {
      const response = await sendMessage(
        messageText,
        setIsLoading,
        selectedConversation
      );
      setMessages([...messages, response]);
      setMessageText("");
    }
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        className="w-full outline-none p-2"
        placeholder="Type a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") sendMessageHandler();
        }}
      />
      {isLoading ? (
        <span className="loading loading-spinner text-primary"></span>
      ) : (
        <IoSendSharp
          className="-ml-6 hover:cursor-pointer hover:text-blue-500"
          onClick={sendMessageHandler}
        />
      )}
    </div>
  );
};

export default SendMessage;
