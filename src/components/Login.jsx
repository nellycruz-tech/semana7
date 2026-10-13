import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    if (!username.trim()) {
      formErrors.username = "Por favor, ingrese su nombre de usuario.";
    }
    if (!password) {
      formErrors.password = "Por favor, ingrese su contraseña.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) {
      return;
    }

    authService.login(username, password).then(
      (data) => {
        onLoginSuccess(data);
        navigate("/profile");
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="col-md-6 offset-md-3 mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Iniciar Sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="form-group d-grid mb-3">
            <button className="btn btn-success">Ingresar</button>
          </div>

          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;