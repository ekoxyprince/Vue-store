<route lang="json">
{
  "meta": {
    "layout": "main"
  }
}
</route>
<template>
  <main ref="pageRef">
    <v-container>
      <v-breadcrumbs :items="['home', 'shop']"></v-breadcrumbs>
      <article>
        <div>
          <div ref="filterRef" class="filter">
            <div class="filter-title">
              <h2>Filter</h2>
            </div>
            <div class="filter-title">
              <h2>Availability</h2>
              <div class="select-wrapper">
                <RadioButton
                  v-model="availabilty"
                  inputId="1"
                  name="In stock"
                  value="in-stock"
                />
                <label for="1">In stock</label>
              </div>
              <div class="select-wrapper">
                <RadioButton
                  v-model="availabilty"
                  inputId="2"
                  name="Out of stock"
                  value="out-of-stock"
                />
                <label for="2">Out of stock stock</label>
              </div>
            </div>
            <div class="filter-title">
              <h2>Brands</h2>
              <div class="select-wrapper" v-for="bra in brands">
                <RadioButton
                  v-model="brand"
                  :inputId="bra.value"
                  :name="bra.title"
                  :value="bra.value"
                />
                <label :for="bra.value">{{ bra.title }}</label>
              </div>
            </div>
            <div class="filter-title">
              <h2>Price</h2>
              <v-row class="w-100" dense>
                <!-- Slider -->
                <v-col cols="12">
                  <v-range-slider
                    v-model="range"
                    :min="5000"
                    :max="1000000"
                    :step="1"
                    hide-details
                    class="w-100"
                  />
                </v-col>

                <!-- Inputs -->
                <v-col cols="6">
                  <v-text-field
                    v-model.number="range[0]"
                    type="number"
                    variant="outlined"
                    density="compact"
                    hide-details
                    label="Min(₦)"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.number="range[1]"
                    type="number"
                    variant="outlined"
                    density="compact"
                    hide-details
                    label="Max(₦)"
                  />
                </v-col>
              </v-row>
            </div>
            <div class="filter-title">
              <h2>Category</h2>
              <div class="select-wrapper" v-for="cat in categories">
                <RadioButton
                  v-model="category"
                  :inputId="cat.value"
                  :name="cat.title"
                  :value="cat.value"
                />
                <label :for="cat.value">{{ cat.title }}</label>
              </div>
            </div>
            <PrimaryButton
              @press="onFilter"
              styles="background-color:#000;color:#fff; width:100%; margin:10px 5px;"
              >Apply Filters</PrimaryButton
            >
          </div>
        </div>
        <div class="product-wrapper">
          <div class="product-wrapper-title">
            <h2>Products</h2>
            <div style="display: flex; align-items: center; gap: 5px">
              <p>
                showing {{ Number((page - 1) * limit) + 1 }} -{{
                  (page - 1) * limit + limit
                }}
                of {{ data?.meta.totalProducts }} products
              </p>
              <i
                v-if="mdAndDown"
                @click="filterActive = !filterActive"
                class="pi pi-filter"
              ></i>
            </div>
          </div>
          <div class="product-grid">
            <ProductSkeleton
              v-if="isFetching"
              v-for="value in Array(limit).fill({})"
            />
            <ProductCard
              v-else
              v-for="product in data?.data"
              :key="product.id"
              :product="product"
            />
          </div>
          <Paginator
            v-model:first="first"
            :rows="limit"
            :totalRecords="data?.meta.totalProducts"
            :rowsPerPageOptions="[5, 10, 20, 30]"
            @page="onPageChange"
          ></Paginator>
        </div>
      </article>
    </v-container>
    <Drawer
      v-model:visible="filterActive"
      position="right"
      class=""
      :showCloseIcon="false"
      :showHeader="false"
    >
      <div class="filter-title">
        <h2>Filter</h2>
      </div>
      <div class="filter-title">
        <h2>Availability</h2>
        <div class="select-wrapper">
          <RadioButton
            v-model="availabilty"
            inputId="1"
            name="In stock"
            value="in-stock"
          />
          <label for="1">In stock</label>
        </div>
        <div class="select-wrapper">
          <RadioButton
            v-model="availabilty"
            inputId="2"
            name="Out of stock"
            value="out-of-stock"
          />
          <label for="2">Out of stock stock</label>
        </div>
      </div>
      <div class="filter-title">
        <h2>Brands</h2>
        <div class="select-wrapper" v-for="bra in brands">
          <RadioButton
            v-model="brand"
            :inputId="bra.value"
            :name="bra.title"
            :value="bra.value"
          />
          <label :for="bra.value">{{ bra.title }}</label>
        </div>
      </div>
      <div class="filter-title">
        <h2>Price</h2>
        <v-row class="w-100" dense>
          <!-- Slider -->
          <v-col cols="12">
            <v-range-slider
              v-model="range"
              :min="1"
              :max="1000000"
              :step="1"
              hide-details
              class="w-100"
            />
          </v-col>

          <!-- Inputs -->
          <v-col cols="6">
            <v-text-field
              v-model.number="range[0]"
              type="number"
              variant="outlined"
              density="compact"
              hide-details
              label="Min(₦)"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model.number="range[1]"
              type="number"
              variant="outlined"
              density="compact"
              hide-details
              label="Max(₦)"
            />
          </v-col>
        </v-row>
      </div>
      <div class="filter-title">
        <h2>Category</h2>
        <div class="select-wrapper" v-for="cat in categories">
          <RadioButton
            v-model="category"
            :inputId="cat.value"
            :name="cat.title"
            :value="cat.value"
          />
          <label :for="cat.value">{{ cat.title }}</label>
        </div>
      </div>
      <PrimaryButton
        @press="onFilter"
        styles="background-color:#000;color:#fff; width:100%; margin:10px 5px;"
        >Apply Filters</PrimaryButton
      >
    </Drawer>
  </main>
</template>

<script setup>
import products from "@/constants/products";
import { Paginator, RadioButton } from "primevue";
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { Drawer } from "primevue";
import { useQuery } from "@tanstack/vue-query";
import ProductService from "@/services/ProductService";
import { useRoute } from "vue-router";
import { categories, brands } from "@/constants/products";
const { mdAndDown } = useDisplay();
const route = useRoute();
const availabilty = ref("");
const brand = ref("");
const category = ref(route?.query.category || "");
const pageRef = ref(null);
const filterRef = ref(null);
const filterActive = ref(false);
const range = ref([1, 1000000]);
const page = ref(1);
const limit = ref(5);
const first = ref(1);
const filter = ref({
  availabilty: availabilty.value,
  brand: brand.value,
  category: category.value,
  minPrice: range.value[0],
  maxPrice: range.value[1],
});
const queryKey = computed(() => [
  "products",
  page.value,
  limit.value,
  filter.value,
  () => route.query.category,
]);
const { data, isFetching } = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    ProductService.getAllProducts({
      page: page.value,
      limit: limit.value,
      filter: filter.value,
    }),
});
const onPageChange = (dt) => {
  page.value = dt.page + 1;
  limit.value = dt.rows;
};
const onFilter = () => {
  filter.value = {
    availabilty: availabilty.value,
    brand: brand.value,
    category: category.value,
    minPrice: range.value[0],
    maxPrice: range.value[1],
  };
  filterActive.value = false;
};
</script>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 5rem;
}
.filter {
  padding: 10px;
  border: 1px solid #ccc;
  height: max-content;
  border-radius: 10px;
  transition: all 0.5s ease;
}
.filter-mobile {
  padding: 10px;
  height: max-content;
  border-radius: 10px;
  transition: all 0.5s ease;
}
article {
  display: grid;
  grid-template-columns: 300px auto;
  gap: 15px;
}
.product-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product-wrapper-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.filter-title {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
.filter-title h2 {
  font-size: 16px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
}
.select-wrapper {
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 10px 0px;
}
.sticky {
  position: fixed;
  top: 0;
  max-width: 300px;
}
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .filter {
    display: none;
  }
  article {
    grid-template-columns: auto;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
