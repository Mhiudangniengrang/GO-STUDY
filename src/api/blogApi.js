import axiosClient from "../config/axiosClient";

const getBlog = (userId) => {
  return axiosClient.get(`/api/BlogPost/yourblog/${userId}`);
};
const getAllBlog = () => {
  return axiosClient.get("/api/BlogPost");
};
const postBlogUser = (userid, formData) => {
  return axiosClient.post(`/api/BlogPost?userid=${userid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteBlogUser = (postId) => {
  return axiosClient.delete(`/api/BlogPost/${postId}`);
};
export { getBlog, getAllBlog, postBlogUser, deleteBlogUser };
