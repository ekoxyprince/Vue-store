import apiInstance from "@/utils/api";

class NotificationService {
  adminNotification(data) {
    return apiInstance
      .post("/api/notifications/admin", data, {})
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new NotificationService();
