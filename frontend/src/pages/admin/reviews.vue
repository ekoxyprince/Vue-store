<route lang="json">
{
  "meta": {
    "layout": "admin"
  }
}
</route>
<template>
  <v-breadcrumbs :items="['admin', 'reviews']"></v-breadcrumbs>
  <v-row>
    <v-col cols="12" lg="12">
      <div class="d-flex justify-space-between mb-2">
        <h2>Reviews</h2>
      </div>
      <v-responsive>
        <div class="table-wrapper">
          <v-data-table-server
            v-model:items-per-page="limit"
            :headers="headers"
            :items="data?.data"
            :items-length="data?.meta?.totalReviews"
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
            :title="isEditing ? 'Edit Reviews' : 'Add Reviews'"
            max-width="700"
          >
            <v-form ref="form" @submit.prevent="submit(isActive)">
              <v-card-text>
                <v-row dense>
                  <v-col cols="6">
                    <v-rating
                      hover
                      :length="5"
                      :size="36"
                      :model-value="formData.rating"
                      v-model="formData.rating"
                      color="#ffc633"
                      active-color="#ffc633"
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
                  <v-col cols="12">
                    <v-textarea
                      label="Review"
                      rows="3"
                      v-model="formData.review"
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

                <v-btn color="primary" type="submit"> Save Reviews </v-btn>
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
import ReviewService from "@/services/ReviewService";
import toast from "vue3-hot-toast";
import { useQueryClient, useMutation, useQuery } from "@tanstack/vue-query";
const queryClient = useQueryClient();
const updateMutation = useMutation({
  mutationFn: ReviewService.update,
  onSuccess: (resp) => {
    toast.success("Review updated");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const page = ref(1);
const limit = ref(10);
const queryKey = computed(() => ["reviews", page.value, limit.value]);
const { data, isFetching } = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    ReviewService.getAllReviews({ page: page.value, limit: limit.value }),
});
const form = ref(null);
const isEditing = ref(false);
const status = ref([
  { id: 1, name: "pending" },
  { id: 2, name: "approved" },
]);
const isActive = ref(false);
const formData = ref({
  rating: 0,
  review: "",
  status: "",
});
const onEdit = (item) => {
  isEditing.value = true;
  formData.value = { ...item };
  isActive.value = true;
};
const submit = async (isActive) => {
  if (!isEditing.value) {
    console.log("No action!");
  } else {
    await updateMutation.mutateAsync(formData.value, {
      onSettled: (resp) => {
        queryClient.invalidateQueries({
          queryKey: ["reviews"],
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
const headers = ref([
  {
    title: "Rating",
    align: "start",
    sortable: false,
    key: "rating",
  },
  { title: "Review", key: "review", align: "center" },
  { title: "User", key: "user.fullname", align: "center" },
  { title: "Product", key: "product.name", align: "center" },
  { title: "Status", key: "status", align: "center" },
  { title: "Actions", key: "actions", align: "end" },
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
