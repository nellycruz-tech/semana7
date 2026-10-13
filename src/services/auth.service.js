import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password, roles) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    roles: roles ? [roles] : ["user"]
  });
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + "signin", {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;