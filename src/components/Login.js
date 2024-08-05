import React, { useContext } from "react";
import "./Login.css";
import { Card, Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { auth, googleAuthProvider } from "../config/firebaseConfig";
import UserContext from "../contexts/UserContext";

function Login() {
  const { updateUser } = useContext(UserContext);

  const signIn = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then((res) =>
        updateUser((currUser) => {
          return {
            ...currUser,
            name: res.user.displayName,
            email: res.user.email,
            photoUrl: res.user.photoURL,
          };
        })
      )
      .catch((err) => alert(err.message));
  };

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
          onClick={signIn}
        >
          Login with Google
        </Button>
      </Card>
    </div>
  );
}

export default Login;
