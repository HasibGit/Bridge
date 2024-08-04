import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "antd";

function SidebarChat({ id, name }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebar_chat">
      <Avatar src={"https://api.dicebear.com/9.x/pixel-art/svg?seed=" + seed} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p>Last message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
