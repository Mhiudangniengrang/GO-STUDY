import { create } from "zustand";
import {
  deleteBlogUser,
  getAllBlog,
  getBlog,
  postBlogUser,
} from "../api/blogApi";

const useBlog = create((set) => ({
  blog: [],
  fetchGetBlog: async (userId) => {
    try {
      const res = await getBlog(userId);
      console.log("blog:", res.data);
      if (res && res.status === 200) {
        set({ blog: res.data });
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  },
  getAllBlog: [],
  fetchGetAllBlog: async () => {
    try {
      const res = await getAllBlog();
      console.log("All blog:", res.data);
      if (res && res.status === 200) {
        set({ getAllBlog: res.data });
      }
    } catch (err) {
      console.error("Error fetching all blog:", err);
    }
  },

  fetchPostBlog: async (userid, formData) => {
    try {
      const response = await postBlogUser(userid, formData);
      console.log("Blog posted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error posting blog:",
        error.response?.data || error.message
      );
    }
  },
  fetchDeleteBlog: async (postId) => {
    try {
      const response = await deleteBlogUser(postId);
      console.log("Blog deleted successfully:", response.data);
    } catch (error) {
      console.error("Error delete blog:", error);
    }
  },
}));

export default useBlog;
