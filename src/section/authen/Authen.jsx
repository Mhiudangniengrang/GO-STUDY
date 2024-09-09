// src/Login.js
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import image from "../assets/account/login.png";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Authen = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const handleGoogleSuccess = (credentialResponse) => {
  //   const token = credentialResponse.credential;
  //   setJwtToken(token);
  //   console.log("Google Success:", token);

  //   // Decode the JWT to get user information
  //   const decoded = jwtDecode(token);
  //   setDecodedToken(decoded);
  //   console.log("Decoded Token:", decoded);

  //   fetch("https://localhost:7168/api/auth/google", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Backend response:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending token to backend:", error);
  //     });
  // };
  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    setJwtToken(token);
    console.log("Google Success:", token);

    // Decode the JWT to get user information
    const decoded = jwtDecode(token);
    const avatarUrl = decoded.picture;
    console.log("Decoded Token:", decoded);

    // Save token and avatar to cookies
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("avatar", avatarUrl, { expires: 7 });

    // Navigate to the home page
    navigate("/user");
  };
  const handleGoogleError = () => {
    console.log("Google Sign-In Error");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-white">
      <div className="w-full max-w-lg px-4 lg:px-5 space-y-10 mx-auto lg:mx-28 mb-10 lg:mb-20">
        <h1 className="text-3xl lg:text-5xl font-bold text-blue-900 text-center">
          WELCOME!
        </h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          className="space-y-4"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              placeholder="Email"
              className="border-b-2 border-orange-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="border-b-2 border-orange-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between items-center">
              <Checkbox name="remember">Remember</Checkbox>
              <a href="#" className="text-blue-500">
                Forgot Password?
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </p>
          <p className="my-2">or</p>
        </div>
      </div>

      <img
        src={image}
        className="w-full lg:w-[49%] lg:mt-0"
        alt="Illustration"
      />
    </div>
  );
};

export default Authen;
