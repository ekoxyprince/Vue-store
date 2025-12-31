import apiInstance from "@/utils/api";

class ReviewService {
  create(data) {
    return apiInstance
      .post("/api/reviews/", data, {})
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  getAllReviews({ page, limit }) {
    return apiInstance
      .get(`/api/reviews?page=${page}&limit=${limit}`)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  update(data) {
    return apiInstance
      .patch(`/api/reviews/${data.id}`, data)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new ReviewService();
