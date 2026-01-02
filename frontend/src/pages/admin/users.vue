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
              <v-btn
                icon
                size="small"
                variant="text"
                color="#000"
                @click="onEdit.call(this, item)"
              >
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </template>
          </v-data-table-server>
        </div>
      </v-responsive>
    </v-col>
  </v-row>
  <v-dialog v-model="isActive" max-width="500">
    <template #default="{ isActive }">
      <v-card :title="'Send Message to' + formData.name" max-width="700">
        <v-form ref="form" @submit.prevent="submit(isActive)">
          <v-card-text>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  label="Fullname"
                  type="text"
                  v-model="formData.name"
                  required
                  readonly
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Email"
                  type="text"
                  v-model="formData.email"
                  required
                  readonly
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Subject"
                  type="text"
                  v-model="formData.subject"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Message"
                  rows="3"
                  v-model="formData.message"
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

            <v-btn color="primary" type="submit"> Send Message </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import UserService from "@/services/UserService";
import NotificationService from "@/services/NotificationService";

const page = ref(1);
const limit = ref(10);
const isActive = ref(false);
const formData = ref({});
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
const onEdit = (item) => {
  formData.value = { name: item.fullname, email: item.email };
  isActive.value = true;
};
const mutation = useMutation({
  mutationFn: NotificationService.adminNotification,
  onSuccess: (resp) => {
    toast.success("Message sent");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const submit = async (isActive) => {
  await mutation.mutateAsync(formData.value, {
    onSettled: (resp) => {
      isActive.value = false;
    },
  });
};
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
