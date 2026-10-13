import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser, showModeratorBoard, showAdminBoard, logOut }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link to={"/"} className="navbar-brand">
        Tecsup JWT App
      </Link>
      <div className="navbar-nav me-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Inicio
          </Link>
        </li>

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to={"/mod"} className="nav-link">
              Tablero Moderador
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/admin"} className="nav-link">
              Tablero Admin
            </Link>
          </li>
        )}

        {currentUser && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              Usuario
            </Link>
          </li>
        )}
      </div>

      {currentUser ? (
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              Cerrar Sesión
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Iniciar Sesión
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Registrarse
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;