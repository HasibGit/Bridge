import React from "react";
import "./Sidebar.css";
import { Avatar, Button, Input, Tooltip } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  MenuOutlined,
  PlusSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  const createChat = () => {
    const roomName = prompt("Enter room name");

    if (roomName) {
      console.log("Room being created");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar size={50} icon={<UserOutlined />} />
        <div className="sidebar_headerRight">
          <Tooltip title="Create room">
            <Button
              shape="circle"
              icon={<PlusSquareOutlined />}
              onClick={createChat}
            />
          </Tooltip>

          <Button shape="circle" icon={<MessageOutlined />} />
          <Button shape="circle" icon={<MenuOutlined />} />
        </div>
      </div>
      <div className="sidebar_search">
        <Input placeholder="Search" prefix={<SearchOutlined />} />
      </div>
      <div className="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
