import React from "react";
import "./Sidebar.css";
import { Avatar, Button } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  MenuOutlined,
  ChromeOutlined,
} from "@ant-design/icons";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar size={50} icon={<UserOutlined />} />
        <div className="sidebar_headerRight">
          <Button shape="circle" icon={<ChromeOutlined />} />
          <Button shape="circle" icon={<MessageOutlined />} />
          <Button shape="circle" icon={<MenuOutlined />} />
        </div>
      </div>
      <div className="sidebar_search"></div>
      <div className="sidebar_chats"></div>
    </div>
  );
}

export default Sidebar;
