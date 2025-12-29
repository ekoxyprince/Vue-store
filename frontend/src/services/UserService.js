import apiInstance from "@/utils/api";

class UserService {
  updateUserDetails(data) {
    return apiInstance
      .patch("/api/users/profile", data)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  updateUserPassword(data) {
    return apiInstance
      .patch("/api/users/change-password", data)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  getAllUsers({ page, limit }) {
    return apiInstance
      .get(`/api/users?page=${page}&limit=${limit}`)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new UserService();
