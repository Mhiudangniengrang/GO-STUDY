import Cookies from "js-cookie";
import { create } from "zustand";
import { getInfoUser } from "../api/authenApi";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const useAuthen = create((set) => ({
  infoUser: {},
  isAuthenticated: !!Cookies.get("__token"),
  fetchUserInfo: async (userId) => {
    try {
      const res = await getInfoUser(userId);
      console.log("info", res.data.role);
      if (res && res.status === 200) {
        set({ infoUser: res.data || {} });
      } else if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
      }
    } catch (err) {
      console.error("Error fetching userInfo", err);
    }
  },
  login: () => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove("__token");
    sessionStorage.removeItem("keys");
    set({ isAuthenticated: false, infoUser: {} });
  },
}));

const handleUnauthorized = () => {
  Cookies.remove("__token");
  set({ isAuthenticated: false, infoUser: {} });
  notification.error({
    message: "Session Expired",
    description: "Please log in again.",
    duration: 2,
  });
  const navigate = useNavigate();
  navigate("/");
};

export default useAuthen;
