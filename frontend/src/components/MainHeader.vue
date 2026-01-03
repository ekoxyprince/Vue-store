<template>
  <div style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)">
    <V-container
      :class="[
        'd-flex ga-8 align-center',
        mdAndUp ? '' : 'justify-space-between',
      ]"
    >
      <div class="d-flex ga-6 align-center">
        <v-app-bar-nav-icon
          v-if="smAndDown"
          @click.stop="isActive = !isActive"
          variant="text"
        ></v-app-bar-nav-icon>
        <div style="width: 200px; height: 80px">
          <v-img style="width: 100%; height: 100%" :src="logo"></v-img>
        </div>
      </div>
      <nav v-if="mdAndUp" class="d-flex ga-6">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop">Shop</RouterLink>
        <RouterLink to="/about">About us</RouterLink>
        <RouterLink to="/contact">Contact us</RouterLink>
      </nav>
      <div v-if="mdAndUp" class="search-container" style="flex: 1">
        <i class="pi pi-search"></i>
        <input
          class="flex-fill w-100 search"
          type="text"
          placeholder="Search for products"
          v-model="filter.search"
          @input="search"
        />
        <div class="search-result-container" v-if="data">
          <v-col dense v-if="data" v-for="product in data">
            <ProductSearch
              @route="$router.push(`/shop/${product.id}`), (data = null)"
              :item="product"
          /></v-col>
        </div>
      </div>
      <div class="d-flex ga-3">
        <i
          @click="searchActive = !searchActive"
          v-if="smAndDown"
          class="pi pi-search"
        ></i>
        <RouterLink class="cart-link" to="/cart">
          <div class="cart-num-container">{{ cart.items.length }}</div>
          <i class="pi pi-shopping-cart"></i>
        </RouterLink>
        <RouterLink to="/user">
          <i class="pi pi-user"></i>
        </RouterLink>
      </div>
    </V-container>
    <v-navigation-drawer
      v-model="isActive"
      :location="$vuetify.display.mobile ? 'left' : undefined"
      temporary
    >
      <MainSidebar />
    </v-navigation-drawer>
    <Drawer
      v-model:visible="searchActive"
      position="bottom"
      class="search-drawer"
      :showCloseIcon="false"
      :showHeader="false"
      style="height: 85vh; border-radius: 20px 20px 0px 0px"
    >
      <div class="search-container" style="flex: 1">
        <i class="pi pi-search"></i>
        <input
          class="flex-fill w-100 search"
          type="text"
          v-model="filter.search"
          @input="search"
          placeholder="Search for products"
        />
      </div>
      <div>
        <v-col dense v-if="data" v-for="product in data">
          <ProductSearch
            @route="$router.push(`/shop/${product.id}`), (searchActive = false)"
            :item="product"
          />
        </v-col>
      </div>
    </Drawer>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { ref, watch } from "vue";
import { Drawer } from "primevue";
import { useCartStore } from "@/stores/cart";
import ProductService from "@/services/ProductService";
import logo from "@/assets/logo.png";
const { mdAndUp, smAndDown } = useDisplay();
const isActive = ref(false);
const searchActive = ref(false);
const data = ref(null);
const cart = useCartStore();
const group = ref(null);
const filter = ref({ search: "" });
watch(group, () => {
  isActive.value = false;
});
const search = async () => {
  if (filter.value.search == "") {
    data.value = null;
    return;
  }
  const resp = await ProductService.getAllProducts({ filter: filter.value });
  console.log(filter.value);
  console.log(resp.data);
  data.value = resp.data;
};
</script>

<style scoped>
h2 {
  font-size: 28px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}
a {
  font-size: 16px;
  font-weight: 300;
  text-decoration: none;
  color: #000;
  font-family: "Poppins", sans-serif;
}
a:hover {
  opacity: 0.7;
}
i {
  font-size: 22px;
  font-weight: 500;
}
.search {
  outline: none;
  background-color: #f0f0f0;
  padding: 12px 44px;
  border-radius: 25px;
}
.search-container {
  position: relative;
}
.search-result-container {
  width: 100%;
  padding: 10px;
  position: absolute;
  top: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 60vh;
  overflow-y: auto;
}
.search-result-container::-webkit-scrollbar {
  display: none;
}
.search-container > .pi-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.cart-link {
  position: relative;
}
.cart-num-container {
  width: 18px;
  height: 18px;
  background-color: #000;
  color: #fff;
  font-size: 10px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -10px;
}
@media (max-width: 468px) {
  i {
    font-size: 18px;
  }
}
</style>
