import axios from "axios";

const API = axios.create({ baseURL: "https://memories-api-ymaq.onrender.com" });

API.interceptors.request.use((req) => {
  const storedProfile = localStorage.getItem("profile");

  if (storedProfile) {
    try {
      const parsedProfile = JSON.parse(storedProfile);
      if (parsedProfile && parsedProfile.token) {
        req.headers.Authorization = `Bearer ${parsedProfile.token}`;
      }
    } catch (error) {
      console.error("Error parsing profile data:", error);
    }
  }

  return req;
});

const fetchPostsData = async (page) => {
  const response = await API.get(`/posts?page=${page}`);
  console.log(response);
  return response;
};

export const fetchPost = async (id) => {
  const response = await API.get(`/posts/${id}`);
  console.log(response);
  return response;
};

export const fetchPostByQuery = async (searchQuery) => {
  const response = await API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
  console.log(response);
  return response;
};

export const sendPostData = async (postData) => {
  const response = await API.post("/posts", postData);
  console.log(response.data);
  return response;
};

export const updatePostData = async (_id, updatedPost) => {
  const response = await API.patch(`/posts/${_id}`, updatedPost);
  console.log(response.data);
  return response;
};

export const deletePostApi = async (id) => {
  const response = await API.delete(`/posts/${id}`);
  return response;
};

export const likePost = async (id) => {
  const response = await API.patch(`/posts/${id}/likePost`);
  console.log(response.data);
  return response;
};

export const commentPost = async (comment, id) => {
  const response = await API.post(`/posts/${id}/commentPost`, { comment });
  console.log(response.data);
  return response;
};

export const signup = async (data) => {
  const response = await API.post("/users/signup", data);
  console.log(response.data);
  return response;
};

export const signin = async (data) => {
  const response = await API.post("/users/signin", data);
  console.log(response.data);
  return response;
};

export default fetchPostsData;
