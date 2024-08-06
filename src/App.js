import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserContext from "./contexts/UserContext";
import { auth } from "./config/firebaseConfig";
import Home from "./components/Home";

function App() {
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser((currUser) => {
          return {
            ...currUser,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <UserContext.Provider value={{ user: user, updateUser: setUser }}>
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
              <Route
                path="/"
                element={
                  <Home
                    handleSidebarOpen={setOpen}
                    isSmallScreen={isSmallScreen}
                  />
                }
              />
            </Routes>
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
