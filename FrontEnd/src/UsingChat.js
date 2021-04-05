import { useEffect, useRef, useState } from "react";
import socketIoClient from "socket.io-client"
//import socket from "./Socket"
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = window.location.origin;

const UsingChat = (room) => {
  console.log('I am in Using Chat react hook!')
  const [messages, setMessages] = useState([]);//all sent and received messages
  const socketRef = useRef();
  console.log('in usingChat react hook messages', messages)
  console.log('socketRefxs', socketRef.current)

  useEffect(() => {
    socketRef.current = socketIoClient(SOCKET_SERVER_URL, {
      query: { room: room }
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