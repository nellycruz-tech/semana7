import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import authService from "./services/auth.service";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const updateState = (user) => {
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    } else {
      setCurrentUser(undefined);
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  };

  useEffect(() => {
    const user = authService.getCurrentUser();
    updateState(user);
  }, []);

  const logOut = () => {
    authService.logout();
    updateState(null);
  };

  return (
    <Router>
      <div>
        <Navbar
          currentUser={currentUser}
          showModeratorBoard={showModeratorBoard}
          showAdminBoard={showAdminBoard}
          logOut={logOut}
        />

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login onLoginSuccess={updateState} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;