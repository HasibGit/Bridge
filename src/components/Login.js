import React from "react";
import "./Login.css";
import { Card, Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

function Login() {
  return (
    <div className="login_container">
      <Card className="login_card">
        <img src="/bridge.png" alt="logo"></img>
        <h2>
          Login to{" "}
          <span style={{ fontWeight: "bold", color: "#408140" }}>Bridge</span>
        </h2>
        <Button
          type="primary"
          style={{ backgroundColor: "#5cb85c" }}
          icon={<GoogleOutlined />}
        >
          Login with Google
        </Button>
      </Card>
    </div>
  );
}

export default Login;
