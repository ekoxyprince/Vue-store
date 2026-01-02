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
  <v-breadcrumbs :items="['admin', 'orders']"></v-breadcrumbs>
  <v-row>
    <v-col cols="12" lg="12">
      <h2>Orders</h2>
      <v-responsive>
        <div class="table-wrapper">
          <v-data-table-server
            v-model:items-per-page="limit"
            :headers="headers"
            :items="data?.data"
            :items-length="data?.meta?.totalOrders"
            :loading="isFetching"
            item-value="name"
            @update:options="changeOptions"
          >
            <template #item.actions="{ item }">
              <v-btn
                icon
                size="small"
                variant="text"
                color="#000"
                @click="editOrder.call(this, item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="#000"
                @click="viewOrderItem.call(this, item)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <template #item.date="{ item }">
              <p>{{ new Date(item.createdAt).toLocaleDateString() }}</p>
            </template>
          </v-data-table-server>
        </div>
      </v-responsive>
    </v-col>
  </v-row>
  <v-dialog v-model="isActive" max-width="500">
    <template #default="{ isActive }">
      <v-card :title="isEditing ? 'Edit Order' : 'Add Coupon'" max-width="700">
        <v-form ref="form" @submit.prevent="submit(isActive)">
          <v-card-text>
            <v-row dense>
              <v-col cols="6">
                <v-select
                  label="Status"
                  :items="status"
                  item-title="name"
                  item-value="name"
                  v-model="formData.status"
                  required
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn variant="text" @click="isActive.value = false">
              Cancel
            </v-btn>

            <v-btn color="primary" type="submit"> Save Order </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
  <v-dialog v-model="isActiveView" max-width="500">
    <template #default="{ isActive }">
      <v-card title="Order Items" max-width="700">
        <v-form ref="form" @submit.prevent="submit(isActive)">
          <v-card-text>
            <v-row dense v-for="product in products" v-if="isActiveView">
              <div class="wrapper">
                <OrderItem :item="product" />
              </div>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn variant="text" @click="isActive.value = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import OrderService from "@/services/OrderService";
import toast from "vue3-hot-toast";
const queryClient = useQueryClient();
const formData = ref({});
const isActive = ref(false);
const isActiveView = ref(false);
const isEditing = ref(false);
const products = ref([]);
const form = ref(null);
const updateMutation = useMutation({
  mutationFn: OrderService.update,
  onSuccess: (resp) => {
    toast.success("Order updated");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const page = ref(1);
const limit = ref(10);
const queryKey = computed(() => ["orders", page.value, limit.value]);
const { data, isFetching } = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    OrderService.getAllOrders({ page: page.value, limit: limit.value }),
});
const changeOptions = ({ page: pageNum, itemsPerPage, sortBy }) => {
  page.value = pageNum;
  limit.value = itemsPerPage;
};
const submit = async (isActive) => {
  if (isEditing.value) {
    await updateMutation.mutateAsync(formData.value, {
      onSettled: (resp) => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
        isActive.value = false;
      },
    });
  } else {
    console.log("Not editing");
  }
};
const headers = ref([
  {
    title: "OrderId",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Total", key: "total", align: "end" },
  { title: "Status", key: "status", align: "end" },
  { title: "User", key: "user.fullname", align: "end" },
  { title: "date", key: "date", align: "end" },
  { title: "Actions", key: "actions", align: "end" },
]);

const status = ref([
  { id: 1, name: "processing" },
  { id: 2, name: "delivered" },
  { id: 2, name: "canceled" },
]);
const editOrder = (item) => {
  formData.value = { ...item };
  isActive.value = true;
  isEditing.value = true;
};
const viewOrderItem = (item) => {
  products.value = item.products;
  isActiveView.value = true;
  console.log(item);
};
</script>

<style scoped>
.wrapper {
  width: 468px;
}
.table-wrapper {
  overflow-x: auto !important;
  width: 100%;
}
@media (max-width: 468px) {
  .table-wrapper {
    max-width: 400px;
  }
  .wrapper {
    width: 400px;
  }
}
@media (max-width: 400px) {
  .table-wrapper {
    max-width: 320px;
  }
  .wrapper {
    width: 300px;
  }
}
</style>
