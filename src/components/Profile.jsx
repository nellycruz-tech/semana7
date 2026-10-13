import React from "react";
import authService from "../services/auth.service";

const Profile = () => {
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    return <div className="container mt-4">No has iniciado sesión.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3>Perfil de Usuario</h3>
        <p><strong>Usuario:</strong> {currentUser.username}</p>
        <p><strong>ID:</strong> {currentUser.id}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Token JWT (recortado):</strong> {currentUser.accessToken.substring(0, 30)}...</p>
        <strong>Roles asignados:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Profile;