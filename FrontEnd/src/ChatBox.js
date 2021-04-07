import React, { useState } from "react";
import UsingChat from "./UsingChat";

const ChatBox = ({ room }) => {
  const { messages, sendMessage } = UsingChat(room);
  const [newMessage, setNewMessage] = useState("");

  const handleTypingMessage = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSubmit = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div id="chat box">
      <div>
        <h4> Scribble a note to your partner!</h4>
      </div>
      <div>
        <div className="messageList" style={{ listStyleType: "none" }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`single-message ${
                message.ownedByCurrentPlayer ? "my-message" : "received-message"
              }`}
            >
              {message.length > 10
                ? `${message.body.slice(0, 13)} \n ${message.body.slice(14)}`
                : message.body}
            </div>
          ))}
        </div>
      </div>
      <textarea
        style={{ marginTop: "10px" }}
        value={newMessage}
        onChange={handleTypingMessage}
        placeholder="Write something..."
        className="new-message-input"
      />
      <button onClick={handleSubmit} className="submit-button">
        Send
      </button>
    </div>
  );
};

export default ChatBox;
