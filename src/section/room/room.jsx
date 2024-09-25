// src/App.js
import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  notification,
  Checkbox,
  Input,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import home from "../assets/account/home.png";
import gao from "../assets/account/gao.png";
import roomImg from "../assets/landing/roomimg.png";
import room from "../assets/landing/room.png";
import useAuthen from "../../hooks/useAuthen";
import Cookies from "js-cookie";
import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import RoomTask from "./roomTask";
const { Meta } = Card;

function Room() {
  const navigate = useNavigate();
  const { isAuthenticated, infoUser, fetchUserInfo } = useAuthen();
  const avatarUrl = infoUser.profileImage || "";
  const userName = infoUser.fullName || "";
  const email = infoUser.email || ";";
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (isAuthenticated && !infoUser.fullName && userId) {
      fetchUserInfo(userId);
    }
  }, [isAuthenticated, infoUser, fetchUserInfo]);

  const [rooms, setRooms] = useState([
    {
      id: "1",
      name: "Ngôn ngữ Anh",
      description: "Cung nhau hoc nao",
      online: 0,
    },
    {
      id: "2",
      name: "Ngôn ngữ Trung",
      description: "Hay hoc cung nhau ",
      online: 0,
    },
    {
      id: "3",
      name: "Design",
      description: "Hay hoc cung nhau ",
      online: 0,
    },
    {
      id: "4",
      name: "Marketing",
      description: "Hay hoc cung nhau ",
      online: 0,
    },
    {
      id: "5",
      name: "Marketing",
      description: "Hay hoc cung nhau ",
      online: 0,
    },
    {
      id: "6",
      name: "Marketing",
      description: "Hay hoc cung nhau ",
      online: 0,
    },
  ]);
  const lockedRooms = [
    { id: "1", name: "Ngôn ngữ Anh", online: 0 },
    { id: "2", name: "Ngôn ngữ Trung", online: 0 },
  ];

  const joinRoom = (roomId, roomName) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, online: room.online + 1 } : room
      )
    );
    navigate(`/user/room/${roomId}`, { state: { roomName } });
  };

  const notifyLocked = () => {
    notification.error({
      message: "Access Denied",
      description: "Bạn không thể vào phòng này.",
    });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([
    "Hoàn thành bài tập lúc 8h",
    "Cố gắng hoàn thành trước 7h tối",
  ]);
  const [currentTask, setCurrentTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const showModal = (task = "", index = null) => {
    setCurrentTask(task);
    setEditIndex(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentTask("");
    setEditIndex(null);
  };

  const handleSave = () => {
    if (!currentTask.trim()) {
      message.warning("Task cannot be empty");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = currentTask;
      setTasks(updatedTasks);
    } else if (tasks.length < 5) {
      setTasks([...tasks, currentTask]);
    }

    handleCancel();
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  return (
    <div className="flex flex-col md:flex-row  min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white p-10 ">
        <div className="bg-gradient-to-t from-[#C8E2FF] to-white p-4 rounded-lg shadow-md text-center w-[13rem] h-[20rem] mt-5">
          <div className="flex justify-center">
            <img src={home} alt="Upgrade Icon" />
          </div>
          <h3 className="font-bold text-lg">
            Upgrade to <span className="text-orange-500">PRO</span> for more
            features.
          </h3>
          <Button
            size="large"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full"
          >
            Upgrade
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center mb-4">
            <Avatar size="large" src={avatarUrl} />
            <div className="ml-2">
              <div className="font-bold">{userName}</div>
            </div>
          </div>
          <img src={roomImg} alt="Room Image" className="w-full h-[12rem]" />
        </div>
        <RoomTask />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/5 p-4">
        <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-[#5088FF] to-[#DAE5FF] flex items-center">
          <img src={room} alt="Study Image" className="w-40 h-40 mr-4" />
          <div className="space-y-3">
            <h2 className="text-4xl font-medium text-[#034EA1]">
              Find your study room now!
            </h2>
            <p className="text-[#034EA1]">
              Explore, connect, and excel with Go! Study - your pathway to
              success!
            </p>
          </div>
        </div>

        {/* Your Room Section */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-[#034EA1] mb-3">Your Room</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-gray-100 p-5 py-10 space-y-5 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold">{room.name}</h2>
                    <h4 className="text-sm text-gray-500">
                      {room.description}
                    </h4>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
                    <span>{room.online} online</span>
                  </div>
                </div>
                <button
                  onClick={() => joinRoom(room.id, room.name)}
                  className="bg-blue-500 text-white py-2 rounded"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* More Room Section */}
        {/* <div className="mb-8">
          <h3 className="text-xl font-medium text-[#034EA1]">More Room</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lockedRooms.map((room) => (
              <div
                key={room.id}
                className="bg-gray-100 p-5 py-10 space-y-5 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold">{room.name}</h2>
                    <h4 className="text-sm text-gray-500">
                      This room is locked.
                    </h4>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-red-500 w-2 h-2 rounded-full mr-2"></span>
                    <span>{room.online} online</span>
                  </div>
                </div>
                <button
                  onClick={notifyLocked}
                  className="bg-blue-500 text-white py-2 rounded cursor-not-allowed"
                  disabled
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/5 bg-gray-50 p-4">
        {/* New Members Section */}
        <div className="mb-8">
          <div className="mb-5">
            <div className="flex justify-center">
              <Avatar size="large" className="w-32 h-32 mb-3" src={avatarUrl} />
            </div>
            <div className="ml-2 flex-col text-center">
              <div className="font-bold">{userName}</div>
              <div className="text-gray-500">{email}</div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-[#034EA1] flex justify-between">
            New Members{" "}
            <span className="text-sm text-blue-500 cursor-pointer">
              See all
            </span>
          </h3>
          <div className="space-y-3">
            {[
              "Anne Couture",
              "Miriam Soleil",
              "Marie Laval",
              "Mark Morain",
            ].map((name, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-3 rounded-lg shadow-sm"
              >
                <Avatar size="small" />
                <div className="ml-3">
                  <div className="font-bold">{name}</div>
                  <div className="text-sm text-gray-500">
                    {5 + index * 15} min ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <h3 className="text-lg font-medium text-[#034EA1] flex justify-between">
            Recent Activity{" "}
            <span className="text-sm text-blue-500 cursor-pointer">
              See all
            </span>
          </h3>
          <div className="space-y-3">
            {[
              { name: "Hola Spine", action: "invited you to a room" },
              { name: "Eva Solain", action: "invited you to a chat" },
              { name: "Pierre Ford", action: "started following you" },
              { name: "Steve Ater", action: "started following you" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-3 rounded-lg shadow-sm"
              >
                <Avatar size="small" />
                <div className="ml-3">
                  <div className="font-bold">{activity.name}</div>
                  <div className="text-sm text-gray-500">{activity.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
