import apiInstance from "@/utils/api";

class ProductService {
  create(data) {
    return apiInstance
      .post("/api/products/", data, {
        headers: {
          "Content-Type": "multipart-formdata",
        },
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  getAllProducts({ page, limit }) {
    return apiInstance
      .get(`/api/products?page=${page}&limit=${limit}`)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
  update(data) {
    return apiInstance
      .patch(`/api/products/${data.id}`, data)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new ProductService();
