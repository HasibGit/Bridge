import React, { useContext } from "react";
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
import { useParams } from "react-router-dom";
import db from "../config/firebaseConfig";
import UserContext from "../contexts/UserContext";

function formatTimestamp(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const strHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year} ${strHours}:${minutes} ${ampm}`;
}

function Chat({ handleSidebarOpen, isSmallScreen }) {
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => {
              return { messageId: doc.id, ...doc.data() };
            })
          )
        );
    }
  }, [roomId]);

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
          <h3>{roomName}</h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat_headerRight">
          <Button style={{ border: "none" }} icon={<SearchOutlined />} />
          <Button style={{ border: "none" }} icon={<PaperClipOutlined />} />
          <Button icon={<MoreOutlined />} />
        </div>
      </div>
      <div className="chat_body">
        {messages.map((data) => (
          <ChatMessage
            key={data.messageId}
            message={data.message}
            name={data.name}
            timestamp={formatTimestamp(data.timestamp)}
            receiver={user.email === data.email}
          />
        ))}
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
