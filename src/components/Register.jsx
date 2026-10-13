import React, { useState } from "react";
import authService from "../services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  // Validación Front-End antes de enviar
  const validate = () => {
    let formErrors = {};
    if (!username.trim()) {
      formErrors.username = "El nombre de usuario es requerido.";
    } else if (username.length < 3) {
      formErrors.username = "El usuario debe tener al menos 3 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = "El correo electrónico es requerido.";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Ingrese un formato de correo válido.";
    }

    if (!password) {
      formErrors.password = "La contraseña es requerida.";
    } else if (password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    if (!validate()) {
      return; // Detener envío si hay errores de validación en el front-end
    }

    authService.register(username, email, password, role).then(
      (response) => {
        setMessage(response.data.message || "¡Registro exitoso!");
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-6 offset-md-3 mt-4">
      <div className="card card-container p-4 shadow-sm">
        <h3 className="text-center mb-3">Registro de Usuario</h3>
        <form onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="form-group mb-3">
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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

              <div className="form-group mb-3">
                <label htmlFor="role">Rol asignado</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Usuario (User)</option>
                  <option value="moderator">Moderador (Moderator)</option>
                  <option value="admin">Administrador (Admin)</option>
                </select>
              </div>

              <div className="form-group d-grid mb-3">
                <button className="btn btn-primary">Registrarse</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;