import React, { useEffect } from "react";
import { Button, Input } from "antd";
import useAuthen from "../../hooks/useAuthen";
import Cookies from "js-cookie";
import { CrownOutlined } from "@ant-design/icons";
const ProfileUser = () => {
  const { isAuthenticated, infoUser, fetchUserInfo } = useAuthen();

  const avatarUrl = infoUser.profileImage || "https://via.placeholder.com/150";
  console.log("avatar", avatarUrl);
  const userName = infoUser.fullName || "User Name";
  const email = infoUser.email || "Not Available";
  const semesterName = infoUser.semester?.name || "Not Available";
  const specializations = infoUser.specialization || "-";
  const address = infoUser.address || "-";
  const introduction = infoUser.introduction || "No introduction provided.";

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (isAuthenticated && !infoUser.fullName && userId) {
      fetchUserInfo(userId);
    }
  }, [isAuthenticated, infoUser, fetchUserInfo]);

  console.log("user", infoUser);
  return (
    <div className="flex justify-center items-center my-10 ">
      <div className="bg-white shadow-lg rounded-lg p-5 w-[700px] border border-orange-200 relative">
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
            />
            <CrownOutlined
              className="absolute top-[-5px] left-[-10px] text-orange-500"
              style={{
                fontSize: "24px",
                transform: "rotate(-15deg)",
              }}
            />
          </div>
          <div className="ml-8">
            <h2 className="text-2xl font-semibold">{userName}</h2>
            <p className="text-gray-600 text-lg">Email: {email}</p>
            <p className="text-gray-600 text-lg">Semeter: {semesterName}</p>
            <p className="text-gray-600 text-lg">
              Specialization: {specializations}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Introduction
          </label>
          <Input.TextArea
            rows={5}
            value={introduction}
            className="text-lg p-4"
            disabled
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            className="bg-blue-500 text-white text-lg px-8 py-2"
            type="primary"
          >
            Save Change
          </Button>
          <Button className="bg-gray-300 text-gray-700 text-lg px-8 py-2">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
