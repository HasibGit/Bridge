import React from "react";
import { Card, Button, Tag } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import "./Home.css";

function Home({ handleSidebarOpen, isSmallScreen }) {
  return (
    <div className="home_container">
      {isSmallScreen && (
        <Button
          shape="circle"
          icon={<DoubleRightOutlined />}
          style={{ position: "absolute", top: "10px", left: "10px" }}
          onClick={() => handleSidebarOpen(true)}
        ></Button>
      )}
      <Card className="home_card">
        <img src="/bridge.png" alt="logo"></img>
        <h1>
          Welcome to{" "}
          <span style={{ fontWeight: "bold", color: "#408140" }}>Bridge</span>!
        </h1>
        <h3>
          Please <Tag color="processing">select</Tag> /{" "}
          <Tag color="success">create</Tag> a room and start chatting!
        </h3>
      </Card>
    </div>
  );
}

export default Home;
