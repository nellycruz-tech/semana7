import React, { useState, useEffect } from "react";
import userService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    userService.getAdminBoard().then(
      (res) => setContent(res.data),
      (err) => setContent("Acceso no autorizado. Se requiere rol de Administrador.")
    );
  }, []);

  return (
    <div className="container mt-4">
      <div className="card p-4 border-danger shadow-sm">
        <h3>Tablero de Administrador</h3>
        <p className="lead">{content}</p>
      </div>
    </div>
  );
};

export default BoardAdmin;