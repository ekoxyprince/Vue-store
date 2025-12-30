<route lang="json">
{
  "meta": {
    "layout": "admin"
  }
}
</route>
<template>
  <v-breadcrumbs :items="['admin', 'products']"></v-breadcrumbs>
  <v-row>
    <v-col cols="12" lg="12">
      <div class="d-flex justify-space-between mb-2">
        <h2>Products</h2>
        <v-btn @click="onClickCreate">Create Product</v-btn>
      </div>
      <v-dialog v-model="isActive" max-width="500">
        <template #default="{ isActive }">
          <v-card
            :title="isEditing ? 'Edit Product' : 'Add Product'"
            max-width="700"
          >
            <v-form ref="form" @submit.prevent="submit(isActive)">
              <v-card-text>
                <v-row dense>
                  <!-- Name -->
                  <v-col cols="12">
                    <v-text-field
                      label="Product Name"
                      v-model="formData.name"
                      required
                    />
                  </v-col>

                  <!-- Price -->
                  <v-col cols="6">
                    <v-text-field
                      label="Price"
                      type="number"
                      v-model="formData.price"
                      required
                    />
                  </v-col>

                  <!-- Discount -->
                  <v-col cols="6">
                    <v-text-field
                      label="Discount"
                      type="number"
                      v-model="formData.discount"
                      required
                    />
                  </v-col>
                  <!-- Stock -->
                  <v-col cols="6">
                    <v-text-field
                      label="Stock Count"
                      type="number"
                      v-model="formData.stockCount"
                      required
                    />
                  </v-col>

                  <!-- Category -->
                  <v-col cols="6">
                    <v-select
                      label="Category"
                      :items="categories"
                      item-title="name"
                      item-value="name"
                      v-model="formData.category"
                      required
                    />
                  </v-col>

                  <!-- Brand -->
                  <v-col cols="6">
                    <v-select
                      label="Brand"
                      :items="brands"
                      item-title="name"
                      item-value="name"
                      v-model="formData.brand"
                    />
                  </v-col>

                  <!-- Description -->
                  <v-col cols="12">
                    <v-textarea
                      label="Description"
                      rows="3"
                      v-model="formData.description"
                      required
                    />
                  </v-col>

                  <!-- Details -->
                  <v-col cols="12">
                    <v-textarea
                      label="Details"
                      rows="3"
                      v-model="formData.details"
                    />
                  </v-col>

                  <!-- Images -->
                  <v-col cols="12" v-if="!isEditing">
                    <v-file-input
                      label="Product Images"
                      multiple
                      show-size
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      v-model="formData.images"
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn variant="text" @click="isActive.value = false">
                  Cancel
                </v-btn>

                <v-btn color="primary" type="submit"> Save Product </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </template>
      </v-dialog>
      <v-responsive>
        <div class="table-wrapper">
          <v-data-table-server
            v-model:items-per-page="limit"
            :headers="headers"
            :items="data?.data"
            :items-length="data?.meta?.totalProducts"
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
                @click="editProduct.call(this, item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <template #item.name="{ item }">
              <div style="align-items: center; gap: 5px" class="d-flex">
                <div style="width: 50px; height: 50px">
                  <v-img
                    style="width: 100%; height: 100%"
                    :src="item.images[0].url"
                  ></v-img>
                </div>
                <p>{{ item.name }}</p>
              </div>
            </template>
          </v-data-table-server>
        </div>
      </v-responsive>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import ProductService from "@/services/ProductService";
import toast from "vue3-hot-toast";
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: ProductService.create,
  onSuccess: (resp) => {
    toast.success("Product created");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const updateMutation = useMutation({
  mutationFn: ProductService.update,
  onSuccess: (resp) => {
    toast.success("Product updated");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const page = ref(1);
const limit = ref(10);
const queryKey = computed(() => ["products", page.value, limit.value]);
const { data, isFetching } = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    ProductService.getAllProducts({ page: page.value, limit: limit.value }),
});
const changeOptions = ({ page: pageNum, itemsPerPage, sortBy }) => {
  page.value = pageNum;
  limit.value = itemsPerPage;
};
const isActive = ref(false);
const isEditing = ref(false);
const form = ref(null);
const categories = ref([
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home" },
]);

const brands = ref([
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Nike" },
]);
const formData = ref({
  id: undefined,
  name: "",
  price: null,
  discount: null,
  description: "",
  details: "",
  stockCount: null,
  category: "",
  brand: "",
  images: [], // <-- multiple images
});
const onClickCreate = () => {
  (isActive.value = true), (isEditing.value = false);
  formData.value = {
    id: undefined,
    name: "",
    price: null,
    discount: null,
    description: "",
    details: "",
    stockCount: null,
    category: "",
    brand: "",
    images: [],
  };
};
const editProduct = (item) => {
  formData.value = { ...item };
  isActive.value = true;
  isEditing.value = true;
};
const submit = async (isActive) => {
  if (!isEditing.value) {
    const payload = new FormData();

    Object.entries(formData.value).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => payload.append("image", file));
      } else {
        payload.append(key, value);
      }
    });
    await mutation.mutateAsync(payload, {
      onSettled: (resp) => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        isActive.value = false;
      },
    });
  } else {
    await updateMutation.mutateAsync(formData.value, {
      onSettled: (resp) => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        isActive.value = false;
      },
    });
  }
};

const headers = ref([
  {
    title: "Name",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Category", key: "category", align: "start" },
  { title: "Brand", key: "brand", align: "start" },
  { title: "Price", key: "price", align: "center" },
  { title: "Discount (%)", key: "discount", align: "center" },
  { title: "Final Price", key: "finalPrice", align: "center" },
  { title: "Stock Count", key: "stockCount", align: "center" },
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
