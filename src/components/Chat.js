import React from "react";
import "./Chat.css";
import { Avatar, Button } from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

function Chat() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat_header">
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
        <div className="chat_message">
          <p>
            <span className="chat_name">Hasib Ullah</span>
            Hey guys
            <span className="chat_timestamp">8/4/2024 3:18PM</span>
          </p>
        </div>
        <div className="chat_message">
          <p>Hey guys</p>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Chat;
