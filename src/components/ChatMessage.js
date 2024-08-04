import React from "react";
import "./ChatMessage.css";

function ChatMessage({ receiver }) {
  return (
    <div className={"chat_message " + (receiver ? "chat_receiver" : "")}>
      <p>
        <span className="chat_name">Hasib Ullah</span>
        Hey guys
        <span className="chat_timestamp">8/4/2024 3:18PM</span>
      </p>
    </div>
  );
}

export default ChatMessage;
