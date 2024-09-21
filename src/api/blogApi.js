import axiosClient from "../config/axiosClient";

const getBlog = (userId) => {
  return axiosClient.get(`/api/BlogPost/yourblog/${userId}`);
};
const getAllBlog = () => {
  return axiosClient.get("/api/BlogPost");
};
const postBlogUser = (userId, blogData) => {
  return axiosClient.post(`/api/BlogPost?userId=${userId}`, blogData);
};
const deleteBlogUser = (postId) => {
  return axiosClient.delete(`/api/BlogPost/${postId}`);
};
export { getBlog, getAllBlog, postBlogUser, deleteBlogUser };
