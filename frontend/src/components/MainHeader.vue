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
        <h2>Shop.co</h2>
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
        />
      </div>
      <div class="d-flex ga-3">
        <i
          @click="searchActive = !searchActive"
          v-if="smAndDown"
          class="pi pi-search"
        ></i>
        <RouterLink to="/cart">
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
          placeholder="Search for products"
        />
      </div>
    </Drawer>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { ref, watch } from "vue";
import { Drawer } from "primevue";
const { mdAndUp, smAndDown } = useDisplay();
const isActive = ref(false);
const searchActive = ref(false);
const group = ref(null);
watch(group, () => {
  isActive.value = false;
});
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
.search-container > .pi-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
@media (max-width: 468px) {
  i {
    font-size: 18px;
  }
}
</style>
