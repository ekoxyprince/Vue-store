<route lang="json">
{
  "meta": {
    "layout": "admin"
  }
}
</route>
<template>
  <v-breadcrumbs :items="['admin', 'users']"></v-breadcrumbs>
  <v-row>
    <v-col cols="12" lg="12">
      <h2>Customers</h2>
      <v-responsive>
        <div class="table-wrapper">
          <v-data-table-server
            v-model:items-per-page="limit"
            :headers="headers"
            :items="data?.data"
            :items-length="data?.meta.totalUsers"
            :loading="isFetching"
            item-value="name"
            @update:options="changeOptions"
          >
            <template #item.actions="{ item }">
              <v-btn icon size="small" variant="text" color="#000" @click="">
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </template>
          </v-data-table-server>
        </div>
      </v-responsive>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import UserService from "@/services/UserService";

const page = ref(1);
const limit = ref(10);
const queryKey = computed(() => ["users", page.value, limit.value]);
const { data, isFetching } = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    UserService.getAllUsers({ page: page.value, limit: limit.value }),
});
const changeOptions = ({ page: pageNum, itemsPerPage, sortBy }) => {
  page.value = pageNum;
  limit.value = itemsPerPage;
};
const headers = ref([
  {
    title: "Fullname",
    align: "start",
    sortable: false,
    key: "fullname",
  },
  { title: "Email", key: "email", align: "center" },
  { title: "Phone", key: "phone", align: "center" },
  { title: "Address", key: "address", align: "center" },
  { title: "Actions", key: "actions", sortable: false, align: "end" },
]);
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
