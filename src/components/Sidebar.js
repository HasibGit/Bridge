import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, Button, Input, Tooltip, Modal } from "antd";
import {
  UserOutlined,
  PlusSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SidebarChat from "./SidebarChat";

function Sidebar({ isSmallScreen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");

  const createChat = () => {
    if (roomName) {
      console.log("Room being created");
    }
    setIsModalOpen(false);
  };

  const handleModalState = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        title="Create Room"
        open={isModalOpen}
        onOk={createChat}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        closable="true"
        okButtonProps={{ disabled: !roomName }}
      >
        <Input
          placeholder="Enter room name"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          style={{ margin: "16px 0" }}
        />
      </Modal>
      <div
        className="sidebar"
        style={{ height: isSmallScreen ? "calc(100vh-57px)" : "100vh" }}
      >
        <div className="sidebar_header">
          <Avatar size={50} icon={<UserOutlined />} />
          <div className="sidebar_headerRight">
            <Tooltip title="Create room">
              <Button
                shape="circle"
                icon={<PlusSquareOutlined />}
                onClick={handleModalState}
              />
            </Tooltip>
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
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
