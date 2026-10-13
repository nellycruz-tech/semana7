import React, { useState, useEffect } from "react";
import userService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    userService.getUserBoard().then(
      (res) => setContent(res.data),
      (err) => setContent("Acceso no autorizado.")
    );
  }, []);

  return (
    <div className="container mt-4">
      <div className="card p-4 border-info shadow-sm">
        <h3>Tablero de Usuario</h3>
        <p className="lead">{content}</p>
      </div>
    </div>
  );
};

export default BoardUser;