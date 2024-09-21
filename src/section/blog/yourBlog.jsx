import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Image, Space, message, notification } from "antd";
import { RetweetOutlined, SmallDashOutlined } from "@ant-design/icons";
import useAuthen from "../../hooks/useAuthen";
import useBlog from "../../hooks/useBlog";
import Cookies from "js-cookie";

function YourBlog() {
  const { isAuthenticated, infoUser, fetchUserInfo } = useAuthen();
  const { blog, fetchGetBlog, fetchDeleteBlog } = useBlog();
  const [postId, setPostId] = useState(""); 
  const userName = infoUser.fullName || "User Name";
  const email = infoUser.email || "Not Available";
  const avatarUrl =
    infoUser.profileImage ||
    "https://i.pinimg.com/originals/9f/c4/a0/9fc4a0105bbfad34b73b90cdc3b7ff06.jpg";

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (isAuthenticated && userId) {
      if (!infoUser.fullName) {
        fetchUserInfo(userId);
      }
      fetchGetBlog(userId);
    }
  }, [isAuthenticated, infoUser, fetchUserInfo, fetchGetBlog]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const onClick = async ({ key }, post) => {
    if (key === "2") {
      setPostId(post.postId); 
      try {
        await fetchDeleteBlog(post.postId);
        notification.success({
          message: "Delete Successful",
          description: "You have delete successfully.",
          duration: 2,
        });
        fetchGetBlog(Cookies.get("userId")); 
      } catch (error) {
        notification.error({
          message: "Delete Failed",
          description: "You have delete Failed.",
          duration: 2,
        });
      }
    } else if (key === "1") {
      message.info(`Edit option selected for post: ${postId}`);
    }
  };

  const items = [
    {
      label: "Edit",
      key: "1",
    },
    {
      label: "Delete",
      key: "2",
    },
  ];

  return (
    <div>
      <div className="">
        {blog && blog.length > 0 ? (
          blog.map((post, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 mb-4 shadow-md bg-white border-orange-300"
            >
              <div className="flex justify-between mb-2">
                <div className="flex ">
                  <Avatar size={44} src={avatarUrl} />
                  <div className="ml-2">
                    <h2 className="font-bold text-orange-600">{userName}</h2>
                    <p className="text-gray-500">{email}</p>
                  </div>
                </div>
                <div>
                  <Dropdown
                    menu={{
                      items,
                      onClick: (e) => onClick(e, post), // Pass post data to onClick
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <SmallDashOutlined className="flex justify-end" />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </div>
              <p className="text-lg">{post.content}</p>
              <Image width={400} height={200} src={post.image} />{" "}
              <div className="flex justify-between text-sm text-gray-500 my-3">
                <p className="text-sm text-gray-400">
                  {formatDate(post.createdAt)}
                </p>
                <div className="flex">
                  <div className="flex items-center mr-4">
                    <RetweetOutlined className="mr-1" /> {post.shareCount || 0}{" "}
                    Shares
                  </div>
                  <div className="flex items-center">
                    ❤️ {post.likeCount || 0} Likes
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg">No blog posts available</p>
        )}
      </div>
    </div>
  );
}

export default YourBlog;
