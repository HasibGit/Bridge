import React from "react";
import "./ChatMessage.css";

function ChatMessage({ message, name, timestamp, receiver }) {
  return (
    <div className={"chat_message " + (receiver ? "chat_receiver" : "")}>
      <p>
        <span className="chat_name">{name}</span>
        {message}
        <span className="chat_timestamp">{timestamp}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
