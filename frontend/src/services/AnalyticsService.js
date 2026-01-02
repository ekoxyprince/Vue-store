import apiInstance from "@/utils/api";

class AnalyticsService {
  getDashboardStats() {
    return apiInstance
      .get(`/api/analytics/dashboard-stats`)
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error?.response?.data?.message || error.message);
      });
  }
}

export default new AnalyticsService();
