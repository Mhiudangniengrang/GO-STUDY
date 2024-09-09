// src/Signup.js
import React from "react";
import { Button, Form, Input, DatePicker, notification } from "antd";
import image from "../assets/account/login.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    notification.success({
      message: "Registration Successful",
      description: "You have successfully registered.",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Registration Failed",
      description: "Please complete all required fields correctly.",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-white">
      <div className="w-full max-w-md px-4 lg:px-5 space-y-10 mx-auto lg:mx-28 mb-10 lg:mb-25 my-12">
        <h1 className="text-3xl lg:text-5xl font-bold text-blue-900 text-center">
          SIGN UP
        </h1>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          className="space-y-4"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              placeholder="Username"
              className="border-b-2 border-orange-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item
            name="fullname"
            rules={[
              { required: true, message: "Please input your Full Name!" },
            ]}
          >
            <Input
              placeholder="Full Name"
              className="border-b-2 border-orange-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item
            name="birthday"
            rules={[
              { required: true, message: "Please select your Birthday!" },
            ]}
          >
            <DatePicker
              className="w-full border-b-2 border-orange-500 py-2 text-base"
              placeholder="Select Birthday"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone!" },
              { pattern: /^[0-9]+$/, message: "Phone must be a number!" },
            ]}
          >
            <Input
              placeholder="Phone"
              className="border-b-2 border-orange-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "The input is not a valid Email!" },
            ]}
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

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your Password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className="border-b-2 border-orange-500 py-2 text-base"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold"
            >
              NEXT
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </p>
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

export default Signup;
