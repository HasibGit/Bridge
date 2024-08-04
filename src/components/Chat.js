import React from "react";
import "./Chat.css";
import { Avatar, Button, Input } from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  PaperClipOutlined,
  SmileOutlined,
  SendOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";

function Chat({ handleSidebarOpen, isSmallScreen }) {
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        {isSmallScreen && (
          <Button
            shape="circle"
            icon={<DoubleRightOutlined />}
            style={{ marginRight: "10px" }}
            onClick={() => handleSidebarOpen(true)}
          ></Button>
        )}

        <Avatar
          src={"https://api.dicebear.com/9.x/pixel-art/svg?seed=" + seed}
        />

        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat_headerRight">
          <Button style={{ border: "none" }} icon={<SearchOutlined />} />
          <Button style={{ border: "none" }} icon={<PaperClipOutlined />} />
          <Button icon={<MoreOutlined />} />
        </div>
      </div>
      <div className="chat_body">
        <ChatMessage receiver={true} />
        <ChatMessage />
      </div>
      <div className="chat_footer">
        <Input
          size="large"
          placeholder="Enter message"
          suffix={<SmileOutlined />}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button
          style={{
            border: "none",
            backgroundColor: "#f8f4ec",
            marginLeft: "10px",
          }}
          shape="circle"
          icon={<SendOutlined />}
          onClick={sendMessage}
        ></Button>
      </div>
    </div>
  );
}

export default Chat;
