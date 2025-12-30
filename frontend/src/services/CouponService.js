import apiInstance from "@/utils/api";

class CouponService {
  create(data) {
    return apiInstance
      .post("/api/coupons/", data, {})
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  getAllCoupons({ page, limit }) {
    return apiInstance
      .get(`/api/coupons?page=${page}&limit=${limit}`)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  update(data) {
    return apiInstance
      .patch(`/api/coupons/${data.id}`, data)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new CouponService();
