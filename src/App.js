import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          {isSmallScreen ? (
            <Drawer placement="left" onClose={onClose} open={open}>
              <Sidebar isSmallScreen={isSmallScreen} />
            </Drawer>
          ) : (
            <Sidebar isSmallScreen={isSmallScreen} />
          )}

          <Routes>
            <Route
              path="/rooms/:roomId"
              element={
                <Chat
                  handleSidebarOpen={setOpen}
                  isSmallScreen={isSmallScreen}
                />
              }
            />
            <Route path="/" element={<h1>Select room</h1>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
