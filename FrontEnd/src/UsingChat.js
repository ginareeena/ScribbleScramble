import { useEffect, useRef, useState } from "react";
import socketIoClient from "socket.io-client";

const SOCKET_SERVER_URL = window.location.origin;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const UsingChat = (room) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIoClient(SOCKET_SERVER_URL, {
      query: { room: room },
    });
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentPlayer: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [room]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };
  return { messages, sendMessage };
};

export default UsingChat;
