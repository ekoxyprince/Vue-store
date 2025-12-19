<template>
  <V-container
    :class="[
      'd-flex ga-8 align-center',
      mdAndUp ? '' : 'justify-space-between',
    ]"
  >
    <div class="d-flex ga-6 align-center">
      <i v-if="smAndDown" class="pi pi-bars"></i>
      <h2>Shop.co</h2>
    </div>
    <nav v-if="mdAndUp" class="d-flex ga-6">
      <a href="">Shop</a>
      <a href="">On Sale</a>
      <a href="">New Arrivals</a>
      <a href="">Brand</a>
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
      <i class="pi pi-shopping-cart"></i>
      <i class="pi pi-user"></i>
    </div>
  </V-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mdAndUp, smAndDown } = useDisplay();
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
  font-size: 18px;
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
.pi-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
