import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, Button, Input, Tooltip, Modal } from "antd";
import {
  PlusSquareOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import db, { auth } from "../config/firebaseConfig";
import SidebarChat from "./SidebarChat";
import UserContext from "../contexts/UserContext";

function Sidebar({ isSmallScreen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
      setFilteredRooms(
        snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const filterRoom = (searchKey) => {
    if (searchKey) {
      const normalizedSearchKey = searchKey.toLowerCase().trim();

      const filteredRooms = rooms.filter((room) => {
        const roomName = room.data.name.toLowerCase().trim();
        return roomName.includes(normalizedSearchKey);
      });

      setFilteredRooms(filteredRooms);
    } else {
      setFilteredRooms(rooms);
    }
  };

  const logout = () => {
    auth.signOut().then(() => updateUser(null));
  };

  const createChat = () => {
    if (roomName) {
      db.collection("rooms").add({ name: roomName });
    }
    setRoomName("");
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
          setRoomName("");
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar size={50} src={user?.photoUrl} />
            <h3>{user?.name}</h3>
          </div>

          <div className="sidebar_headerRight">
            <Tooltip title="Create room">
              <Button
                shape="circle"
                icon={<PlusSquareOutlined />}
                onClick={handleModalState}
              />
            </Tooltip>
            <Tooltip title="Logout">
              <Button
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={logout}
              />
            </Tooltip>
          </div>
        </div>
        <div className="sidebar_search">
          <Input
            placeholder="Search room"
            prefix={<SearchOutlined />}
            onChange={(e) => filterRoom(e.target.value)}
          />
        </div>
        <div className="sidebar_chats">
          {filteredRooms.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
