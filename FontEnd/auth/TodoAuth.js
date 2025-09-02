import axios from "axios";

export const createTodo = async (data) => {
  const token = localStorage.getItem("token");
  await axios.post("https://todo-app-hqvl.onrender.com/api/v1/todo/create", data, {
    headers: { Authorization: `Bearer ${token || ""}` },
  });
};
export const getAllTodo = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `https://todo-app-hqvl.onrender.com/api/v1/todo/getall/${userId}`,
    {},
    { headers: { Authorization: `Bearer ${token || ""}` } }
  );
  return response.data;
};

export const updateTodo = async (todoId, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `https://todo-app-hqvl.onrender.com/api/v1/todo/update/${todoId}`,
    data,
    { headers: { Authorization: `Bearer ${token || ""}` } }
  );
  return response.data;
};

export const deleteTodo = async (todoId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `https://todo-app-hqvl.onrender.com/api/v1/todo/delete/${todoId}`,
    {},
    { headers: { Authorization: `Bearer ${token || ""}` } }
  );
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await axios.post(
    `https://todo-app-hqvl.onrender.com/api/v1/user/forgot-password`,
    { email }
  );
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(
    `https://todo-app-hqvl.onrender.com/api/v1/user/reset-password/${token}`,
    { password }
  );
  return response.data;
};
