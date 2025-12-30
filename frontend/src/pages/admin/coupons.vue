<route lang="json">
{
  "meta": {
    "layout": "admin"
  }
}
</route>
<template>
  <v-breadcrumbs :items="['admin', 'coupons']"></v-breadcrumbs>
  <v-row>
    <v-col cols="12" lg="12">
      <div class="d-flex justify-space-between mb-2">
        <h2>Coupons</h2>
        <v-btn @click="onClickCreate">Create Coupon</v-btn>
      </div>
      <v-responsive>
        <div class="table-wrapper">
          <v-data-table-server
            v-model:items-per-page="limit"
            :headers="headers"
            :items="data?.data"
            :items-length="data?.meta?.totalCoupons"
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
                @click="onEdit.call(this, item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-data-table-server>
        </div>
      </v-responsive>
      <v-dialog v-model="isActive" max-width="500">
        <template #default="{ isActive }">
          <v-card
            :title="isEditing ? 'Edit Coupon' : 'Add Coupon'"
            max-width="700"
          >
            <v-form ref="form" @submit.prevent="submit(isActive)">
              <v-card-text>
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      label="Code"
                      v-model="formData.code"
                      required
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Discount"
                      type="number"
                      v-model="formData.discount"
                      required
                    />
                  </v-col>
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

                <v-btn color="primary" type="submit"> Save Coupon </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import CouponService from "@/services/CouponService";
import toast from "vue3-hot-toast";
import { useQueryClient, useMutation, useQuery } from "@tanstack/vue-query";
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: CouponService.create,
  onSuccess: (resp) => {
    toast.success("Coupon created");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const updateMutation = useMutation({
  mutationFn: CouponService.update,
  onSuccess: (resp) => {
    toast.success("Coupon updated");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const page = ref(1);
const limit = ref(10);
const queryKey = computed(() => ["coupons", page.value, limit.value]);
const { data, isFetching } = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    CouponService.getAllCoupons({ page: page.value, limit: limit.value }),
});
const form = ref(null);
const isEditing = ref(false);
const status = ref([
  { id: 1, name: "active" },
  { id: 2, name: "inactive" },
]);
const isActive = ref(false);
const formData = ref({
  status: undefined,
  code: undefined,
  discount: 0,
});
const onClickCreate = () => {
  isEditing.value = false;
  formData.value = {
    status: undefined,
    code: undefined,
    discount: 0,
  };
  isActive.value = true;
};
const onEdit = (item) => {
  isEditing.value = true;
  formData.value = { ...item };
  isActive.value = true;
};
const submit = async (isActive) => {
  if (!isEditing.value) {
    await mutation.mutateAsync(formData.value, {
      onSettled: (resp) => {
        queryClient.invalidateQueries({
          queryKey: ["coupons"],
        });
        isActive.value = false;
      },
    });
  } else {
    await updateMutation.mutateAsync(formData.value, {
      onSettled: (resp) => {
        queryClient.invalidateQueries({
          queryKey: ["coupons"],
        });
        isActive.value = false;
      },
    });
  }
};
const changeOptions = ({ page: pageNum, itemsPerPage, sortBy }) => {
  page.value = pageNum;
  limit.value = itemsPerPage;
};
const desserts = [];
const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = desserts.slice();
        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }
        const paginated = items.slice(start, end === -1 ? undefined : end);
        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};
const itemsPerPage = ref(5);
const headers = ref([
  {
    title: "Code",
    align: "start",
    sortable: false,
    key: "code",
  },
  { title: "Discount (%)", key: "discount", align: "center" },
  { title: "Status", key: "status", align: "center" },
  { title: "Actions", key: "actions", align: "end" },
]);
const search = ref("");
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
  });
}
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
