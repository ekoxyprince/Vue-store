import apiInstance from "@/utils/api";

class AuthService {
  signup(data) {
    return apiInstance
      .post("/api/auth/register", data)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  signin(data) {
    return apiInstance
      .post("/api/auth/login", data)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  forgotPassword(data) {
    return apiInstance
      .post("/api/auth/forgot-password", data)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  resetPassword(data) {
    return apiInstance
      .post(`/api/auth/reset-password/${data.token}`, data)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new AuthService();
