import React, { useState, useEffect } from "react";
import userService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    userService.getModeratorBoard().then(
      (res) => setContent(res.data),
      (err) => setContent("Acceso no autorizado. Se requiere rol de Moderador.")
    );
  }, []);

  return (
    <div className="container mt-4">
      <div className="card p-4 border-warning shadow-sm">
        <h3>Tablero de Moderador</h3>
        <p className="lead">{content}</p>
      </div>
    </div>
  );
};

export default BoardModerator;