import { api } from "./api";

// Отримати всі чати користувача
export const getUserChats = async () => {
  const response = await api.get("/chats", { withCredentials: true });
  return response.data;
};

// Отримати всі повідомлення в чаті
export const getChatMessages = async (chatId) => {
  const response = await api.get(`/chats/${chatId}/messages`, { withCredentials: true });
  return response.data;
};

// Надіслати повідомлення
export const sendMessage = async ({ chatId, message }) => {
  console.log(chatId, message)
  const response = await api.post(
    "/chats/messages",
    { chatId, message },
    { withCredentials: true }
  );
  return response.data;
};

// Створити новий чат
export const createChat = async (adId, receiverId) => {
  const response = await api.post(
    "/chats",
    { adId: Number(adId), receiverId: Number(receiverId) },
    { withCredentials: true }
  );
  return response.data;
};

