import React, { useState, useEffect } from "react";
import userService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    userService.getPublicContent().then(
      (res) => setContent(res.data),
      (err) => setContent(err.toString())
    );
  }, []);

  return (
    <div className="container mt-4">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <h2>Página Principal (Pública)</h2>
        <p className="fs-4">{content}</p>
      </div>
    </div>
  );
};

export default Home;