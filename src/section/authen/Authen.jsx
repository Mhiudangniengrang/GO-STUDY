// Import necessary libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Form, notification } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { login } from "../../api/authenApi";
import { jwtDecode } from "jwt-decode";
import useAuthen from "../../hooks/useAuthen";
import CryptoJS from "crypto-js";

function Authen() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { fetchUserInfo, infoUser } = useAuthen();

const handleGoogleSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential;
  console.log("token", token);
  try {
    setIsLoggingIn(true);
    const response = await login(token);
    const newToken = response.data.token.accessToken;

    if (typeof newToken === "string") {
      const decoded = jwtDecode(newToken);
      const userId = decoded.sid;

      const encryptedToken = CryptoJS.AES.encrypt(newToken, "tao").toString();

      Cookies.set("__token", encryptedToken, { expires: 7 });
      Cookies.set("userId", userId, { expires: 7 });

      // Fetch user information and update state
      await fetchUserInfo(userId);

      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in.",
        duration: 2,
      });

      // Use infoUser from useAuthen to check specialization
      if (infoUser.specialization && infoUser.specialization.length > 0) {
        navigate("/user/home");
      } else {
        navigate("/user");
      }
    } else {
      console.error("Invalid token format received");
      notification.error({
        message: "Login Failed",
        description: "Invalid token received.",
        duration: 2,
      });
    }
  } catch (error) {
    notification.error({
      message: "Login Failed",
      description: "An error occurred during login. Please try again.",
      duration: 2,
    });
    console.error("Error posting token:", error.response?.data || error.message);
  } finally {
    setIsLoggingIn(false);
  }
};
  return (
    <div className="p-12 w-[100%] max-w-[28rem]">
      <Form name="google_login" className="space-y-6">
        <Form.Item className="flex justify-center p-5">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              notification.error({
                message: "Login Failed",
                description: "Google Sign-In Error. Please try again.",
                duration: 2,
              });
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Authen;
