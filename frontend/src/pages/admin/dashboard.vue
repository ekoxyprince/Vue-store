<route lang="json">
{
  "meta": {
    "layout": "admin"
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
        value="120"
        amount="10"
      />
    </v-col>
    <v-col cols="12" lg="4">
      <DashboardCard
        title="Total Orders"
        icon="pi-shopping-cart"
        value="20"
        amount="0"
      />
    </v-col>
    <v-col cols="12" lg="4">
      <DashboardCard
        title="Total Products"
        icon="pi-box"
        value="50"
        amount="2"
      />
    </v-col>
  </v-row>
  <v-row>
    <div class="card table-wrapper">
      <DataTable :value="products" tableStyle="min-width: 50rem">
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
import { ref, onMounted } from "vue";
import { DataTable, Column } from "primevue";

onMounted(() => {
  products.value = [
    { code: "P001", name: "Product 1", category: "Category A", quantity: 100 },
    { code: "P002", name: "Product 2", category: "Category B", quantity: 150 },
    { code: "P003", name: "Product 3", category: "Category A", quantity: 200 },
    { code: "P004", name: "Product 4", category: "Category C", quantity: 250 },
  ];
});

const products = ref();
const columns = [
  { field: "code", header: "Code" },
  { field: "name", header: "Name" },
  { field: "category", header: "Category" },
  { field: "quantity", header: "Quantity" },
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
