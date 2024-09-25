import {
  InboxOutlined,
  LineChartOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  Tabs,
  Upload,
  message,
  notification,
} from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import useAuthen from "../../hooks/useAuthen";
import useBlog from "../../hooks/useBlog";
import Archive from "./archive";
import TrendingTab from "./trendingTab";
import YourBlog from "./yourBlog";

// Cloudinary import
import { Cloudinary } from "@cloudinary/url-gen";

// Tạo instance Cloudinary
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dphupjpqt", // Thay bằng cloud_name của bạn từ Cloudinary Dashboard
  },
});

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

  const showModal = () => setVisible(true);

  const uploadImages = async (images) => {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ml_default"); // unsigned preset

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dphupjpqt/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Cloudinary upload error:", data);
          throw new Error("Image upload failed");
        }

        return data.secure_url;
      })
    );
    return imageUrls;
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
    try {
      const imageUrls = await uploadImages(images); // Upload all images

      console.log("Images uploaded successfully:", imageUrls);

      const blogData = {
        title: "123",
        content: content,
        images: imageUrls, // Save the array of URLs
      };

      await fetchPostBlog(userId, blogData);
      notification.success({
        message: "Create Successful",
        description: "You have posted successfully.",
        duration: 2,
      });
      resetForm();
      fetchGetBlog(userId);
    } catch (error) {
      message.error(
        "Error posting blog: " + (error.response?.data || error.message)
      );
      console.error("Error posting blog:", error);
    }
  };

  const resetForm = () => {
    setVisible(false);
    setContent("");
    setImages([]);
  };

  const handleImageUpload = ({ fileList }) => {
    setImages(fileList.map((file) => file.originFileObj || file.url)); // Xử lý cả File và URL
  };

  const handleCancel = () => {
    resetForm();
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
                activeKey={activeTab}
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
                accept=".jpg,.jpeg,.png"
                listType="picture-card"
                fileList={images.map((image, index) => ({
                  uid: index.toString(),
                  name: image?.name || `image-${index}`, // Kiểm tra nếu image.name không tồn tại
                  status: "done",
                  url:
                    image instanceof File ? URL.createObjectURL(image) : image, // Kiểm tra xem image là File hay URL
                }))}
                onChange={handleImageUpload}
                onRemove={(file) => {
                  const newImages = images.filter((_, i) => i !== file.uid);
                  setImages(newImages); // Xóa ảnh khi người dùng bấm remove
                }}
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
