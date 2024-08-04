import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, Button, Input, Tooltip, Modal } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  MenuOutlined,
  PlusSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SidebarChat from "./SidebarChat";

function Sidebar() {
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
      <div className="sidebar">
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
