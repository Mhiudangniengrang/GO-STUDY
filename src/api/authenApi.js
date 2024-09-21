import axiosClient from "../config/axiosClient";

const login = (idToken) => {
  return axiosClient.post("/api/auth/google", { idToken });
};

const getInfoUser = (userId) => {
  return axiosClient.get(`/api/User/GetUserProfile/${userId}`);
};

export { login, getInfoUser };