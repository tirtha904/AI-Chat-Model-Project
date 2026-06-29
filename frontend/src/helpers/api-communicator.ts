import axios from "axios";
export const api = axios.create({
  baseURL: "https://ai-chat-model-project-1.onrender.com/api/v1", //
  withCredentials: true, // helps to exchange the cookies
});
export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await api.post("/user/signup", { name, email, password });
    if (res.status !== 201) {
      throw new Error("Unable to Signup");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    throw error;
  }
};
export const checkAuthStatus = async () => {
  try {
    const res = await api.get("/user/auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }

    const data = await res.data;
    return data;
  } catch (error) {
    console.log("server not recieving from api-commini", error);
    throw error;
  }
};

export const sendChatRequest = async (message: string) => {
  try {
    const res = await api.post("/chat/new", { message });
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Something went wrong");
  }
};

export const getUserChats = async () => {
  const res = await api.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await api.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await api.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
