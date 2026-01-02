import apiInstance from "@/utils/api";

class OrderService {
  create(data) {
    return apiInstance
      .post("/api/orders/", data, {})
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  getAllOrders({ page, limit }) {
    return apiInstance
      .get(`/api/orders?page=${page}&limit=${limit}`)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  update(data) {
    return apiInstance
      .patch(`/api/orders/${data.id}`, data)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  getById(code) {
    return apiInstance
      .get(`/api/orders/${code}`)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new OrderService();
