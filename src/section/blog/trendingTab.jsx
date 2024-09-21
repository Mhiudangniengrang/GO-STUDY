import React, { useEffect } from "react";
import { Avatar, Image } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import useBlog from "../../hooks/useBlog";

function TrendingTab() {
  const { getAllBlog, fetchGetAllBlog } = useBlog();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGetAllBlog();
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, [fetchGetAllBlog]);

  // Sort blogs by creation date, newest first
  const sortedBlogs = getAllBlog
    ? [...getAllBlog].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="grid grid-cols-2 gap-4">
      {sortedBlogs.length > 0 ? (
        sortedBlogs.map((post, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow-md bg-white border-orange-300"
          >
            <div className="flex items-center mb-2">
              <Avatar size={44} src={post.user.profileImage} />
              <div className="ml-3">
                <h2 className="font-bold text-orange-600">
                  {post.user.fullName}
                </h2>
                <p className="text-gray-500">{post.user.email}</p>
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
  );
}

export default TrendingTab;
