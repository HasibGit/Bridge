import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import db from "../config/firebaseConfig";

function SidebarChat({ id, name }) {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageSender, setLastMessageSender] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setLastMessage(snapshot?.docs[0]?.data()?.message || "");
          setLastMessageSender(snapshot?.docs[0]?.data()?.name || "");
        });
    }

    return () => unsubscribe();
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar
          src={"https://api.dicebear.com/9.x/pixel-art/svg?seed=" + seed}
        />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p style={{ color: "#aba7a7" }}>
            <span style={{ color: "#212121", fontWeight: "500" }}>
              {lastMessageSender.split(" ")[0] + (lastMessageSender && ": ")}
            </span>
            {lastMessage}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
