import api from "./api";

export const getNotifications = () => {
  return api.get("/notifications");
};

export const getNotificationsByUser = (userId) => {
  return api.get(`/notifications/user/${userId}`);
};

export const createNotification = (notification) => {
  return api.post("/notifications", notification);
};

export const markAsRead = (notificationId) => {
  return api.put(`/notifications/${notificationId}`);
};

export const deleteNotification = (notificationId) => {
  return api.delete(`/notifications/${notificationId}`);
};