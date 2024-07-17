import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useUserContext } from "../../../context/UserContext";
import MessagesShimmer from "../Shimmers/MessagesShimmer";
import StartConversation from "./StartConversation";
import { useGetNewMessage } from "../hooks/useGetNewMessage";
import { MdOutlineRefresh } from "react-icons/md";

const Messages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentDateValue, setCurrentDateValue] = useState(0);
  const [daysRange, setDaysRange] = useState(1);
  const [allMessagesFetched, setAllMessagesFetched] = useState(false);
  const { selectedConversation, messages, setMessages } = useUserContext();
  const messageRef = useRef();
  const messageContainer = useRef();
  useGetNewMessage();

  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);
      try {
        const responseObj = await fetch(
          `/api/messages/${selectedConversation?._id}/${currentDateValue}/${daysRange}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const response = await responseObj.json();
        setMessages((messages) => {
          return [...response.messages, ...messages];
        });
        if (
          messages.length + response.messages.length ===
          response.totalMessages
        ) {
          setAllMessagesFetched(true);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, daysRange, currentDateValue]);

  useEffect(() => {
    if (messageRef.current && currentDateValue === 0) {
      messageRef.current?.scrollIntoView();
    }
  }, [messageRef, messages.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (messageContainer.current.scrollTop === 0 && !allMessagesFetched) {
        setCurrentDateValue(currentDateValue + 1);
        setDaysRange(daysRange + 1);
      }
    };

    messageContainer.current.addEventListener("scroll", handleScroll);

    return () => {
      messageContainer.current.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="flex flex-col overflow-auto flex-1" ref={messageContainer}>
      {isLoading &&
        Array(4)
          .fill()
          .map((el, index) => <MessagesShimmer index={index} />)}
      {!isLoading && messages.length === 0 && <StartConversation />}
      {!isLoading && messages.length > 0 && (
        <div className="flex flex-col">
          <div className="self-center mt-4 flex items-center">
            {!allMessagesFetched && (
              <>
                <span>Scroll to top to load more messages</span>
                <MdOutlineRefresh className="ml-2 text-xl" />
              </>
            )}
          </div>
          <div>
            {messages.map((chatMessage) => {
              return (
                <Message key={chatMessage._id} chatMessage={chatMessage} />
              );
            })}
          </div>
        </div>
      )}
      <div ref={messageRef} />
    </div>
  );
};

export default Messages;
