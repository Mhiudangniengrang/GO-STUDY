import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Input,
  Button,
  Tabs,
  Modal,
  Upload,
  message,
  notification,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  LineChartOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import YourBlog from "./yourBlog";
import TrendingTab from "./trendingTab";
import Archive from "./archive";
import useAuthen from "../../hooks/useAuthen";
import useBlog from "../../hooks/useBlog";
import Cookies from "js-cookie";

function Blog() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("2");
  const { isAuthenticated, infoUser, fetchUserInfo } = useAuthen();
  const { fetchPostBlog, fetchGetBlog } = useBlog();
  const userName = infoUser.fullName || "User name";
  const email = infoUser.email || "Email";
  const avatarUrl = infoUser.profileImage || "Image";
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    if (!content.trim()) {
      message.error("Content cannot be empty.");
      return;
    }
    if (images.length === 0) {
      message.error("Please upload at least one image.");
      return;
    }

    const userId = Cookies.get("userId");
    const blogData = {
      userId: userId,
      title: "",
      content: content,
      image:
        images.length > 0
          ? URL.createObjectURL(images[0])
          : "default-image.png",
    };

    try {
      await fetchPostBlog(userId, blogData);
      notification.success({
        message: "Create Successful",
        description: "You have posted successfully.",
        duration: 2,
      });
      setVisible(false);
      setContent("");
      setImages([]);
      fetchGetBlog(userId);
    } catch (error) {
      console.error(
        "Error posting blog:",
        error.response?.data || error.message
      );
    }
  };

  const handleImageUpload = ({ fileList }) => {
    setImages(fileList.map((file) => file.originFileObj));
  };

  const handleCancel = () => {
    setVisible(false);
    setContent(""); 
    setImages([]); 
  };

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (isAuthenticated && !infoUser.fullName && userId) {
      fetchUserInfo(userId);
    }
  }, [isAuthenticated, infoUser, fetchUserInfo]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const tabItems = useMemo(
    () => [
      {
        label: "Trending",
        key: "1",
        children: <TrendingTab />,
      },
      {
        label: "Your Blog",
        key: "2",
        children: <YourBlog />,
      },
      {
        label: "Archive",
        key: "3",
        children: <Archive />,
      },
    ],
    []
  );
  return (
    <>
      <div className="flex flex-col md:flex-row space-y-5 md:space-x-10">
        <div className="w-full max-w-6xl mx-auto p-6">
          <div className="w-full mb-6">
            <h1 className="text-5xl font-bold text-orange-600">
              Hello, <span className="text-blue-600">{userName}</span>
            </h1>
            <p className="text-lg text-orange-600">Have a nice day!</p>
          </div>
          <div className="w-full">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="mb-4"
            />
            <div className="flex flex-col md:flex-row justify-between mt-3">
              <Tabs
                defaultActiveKey="2"
                onChange={(key) => setActiveTab(key)}
                className="flex-grow"
                items={tabItems}
              />
              <div className="flex space-x-2 mt-4 md:mt-0 ml-0 md:ml-4">
                <Button icon={<PlusOutlined />} onClick={showModal} />
                <Button icon={<LineChartOutlined />} />
                <Button icon={<InboxOutlined />} />
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Create Post"
          open={visible}
          onCancel={handleCancel}
          footer={null}
          centered
          className="custom-modal"
        >
          <div className="flex flex-col p-4">
            <div className="flex items-center mb-4">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{userName}</h3>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>
            <div className="w-full mb-4">
              <Input.TextArea
                placeholder="Caption"
                className="w-full bg-blue-100 p-2 rounded-md"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="w-full mb-4">
              <label className="block mb-2">Add images</label>
              <Upload
                accept=".jpg"
                listType="picture-card"
                fileList={images.map((image, index) => ({
                  uid: index,
                  name: image.name,
                  status: "done",
                  url: URL.createObjectURL(image),
                }))}
                onChange={handleImageUpload}
                onRemove={() => setImages([])}
                multiple
              >
                <div>
                  <PlusOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>
            </div>

            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleOk}
            >
              Create
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Blog;
