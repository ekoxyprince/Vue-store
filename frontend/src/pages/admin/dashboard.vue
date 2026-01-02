<route lang="json">
{
  "meta": {
    "layout": "admin",
    "requireAuth": true,
    "role": "admin"
  }
}
</route>
<template>
  <v-breadcrumbs :items="['admin', 'dashboard']"></v-breadcrumbs>
  <v-row>
    <v-col cols="12" lg="4">
      <DashboardCard
        title="Total Customers"
        icon="pi-users"
        :value="dashboardStats?.data.totalCustomers"
        :amount="dashboardStats?.data.customerToday"
      />
    </v-col>
    <v-col cols="12" lg="4">
      <DashboardCard
        title="Total Orders"
        icon="pi-shopping-cart"
        :value="dashboardStats?.data.totalOrders"
        :amount="dashboardStats?.data.orderToday"
      />
    </v-col>
    <v-col cols="12" lg="4">
      <DashboardCard
        title="Total Products"
        icon="pi-box"
        :value="dashboardStats?.data.totalProducts"
        :amount="dashboardStats?.data.productToday"
      />
    </v-col>
  </v-row>
  <v-row>
    <div class="card table-wrapper">
      <h2>Last 5 Users</h2>
      <DataTable
        v-if="!isFetching"
        :value="users.data"
        tableStyle="min-width: 50rem"
      >
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
    </div>
  </v-row>
</template>

<script setup>
import { DataTable, Column } from "primevue";
import { useQuery } from "@tanstack/vue-query";
import AnalyticsService from "@/services/AnalyticsService";
import UserService from "@/services/UserService";
const { data: dashboardStats } = useQuery({
  queryKey: ["stats"],
  queryFn: () => AnalyticsService.getDashboardStats(),
});
const { data: users, isFetching } = useQuery({
  queryKey: ["users"],
  queryFn: () => UserService.getAllUsers({ page: 1, limit: 5 }),
});
const columns = [
  { field: "fullname", header: "Fullname" },
  { field: "email", header: "Email" },
  { field: "phone", header: "Phone" },
  { field: "address", header: "Address" },
];
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto !important;
  width: 100%;
}
@media (max-width: 468px) {
  .table-wrapper {
    max-width: 400px;
  }
}
@media (max-width: 400px) {
  .table-wrapper {
    max-width: 320px;
  }
}
</style>
