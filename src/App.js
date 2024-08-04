import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import { Drawer } from "antd";

function App() {
  const [open, setOpen] = useState(true);
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
      {isSmallScreen && (
        <Drawer placement="left" onClose={onClose} open={open}>
          <Sidebar isSmallScreen={isSmallScreen} />
        </Drawer>
      )}

      {!isSmallScreen && <Sidebar isSmallScreen={isSmallScreen} />}

      <Chat handleSidebarOpen={setOpen} isSmallScreen={isSmallScreen} />
    </div>
  );
}

export default App;
