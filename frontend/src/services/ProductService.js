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
  getAllProducts({ page, limit, filter }) {
    let url = !filter
      ? `/api/products?page=${page}&limit=${limit}`
      : `/api/products?page=${page}&limit=${limit}&${new URLSearchParams(
          filter
        ).toString()}`;
    return apiInstance
      .get(url)
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
