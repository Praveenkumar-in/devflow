import api from "./api";


// Get All Notifications
export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};


// Create Notification
export const createNotification = async (notificationData) => {
  const { data } = await api.post(
    "/notifications",
    notificationData
  );
  return data;
};


// Mark Notification as Read
export const markAsRead = async (id) => {
  const { data } = await api.put(
    `/notifications/${id}/read`
  );
  return data;
};


// Delete Notification
export const deleteNotification = async (id) => {
  const { data } = await api.delete(
    `/notifications/${id}`
  );
  return data;
};