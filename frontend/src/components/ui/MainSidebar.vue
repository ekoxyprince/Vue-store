<template>
  <div class="container">
    <h2 class="logo">Shop.co</h2>
    <v-tabs v-model="tab" color="#000">
      <v-tab value="one">Menu</v-tab>
      <v-tab value="two">Categories</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one">
        <v-sheet>
          <div class="link-wrapper">
            <div
              v-for="menu in menus"
              :key="menu.title"
              class="router-link-container"
            >
              <RouterLink class="router-link" :to="menu.url">{{
                menu.title
              }}</RouterLink>
            </div>
          </div>
        </v-sheet>
      </v-tabs-window-item>
      <v-tabs-window-item value="two">
        <v-sheet>
          <div class="link-wrapper">
            <div
              v-for="category in categories"
              :key="category.title"
              class="router-link-container"
            >
              <RouterLink
                class="router-link"
                :to="'/shop?category=' + category.value"
                >{{ category.title }}</RouterLink
              >
            </div>
          </div>
        </v-sheet>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
const tab = ref("one");
import { categories } from "@/constants/products";
const menus = ref([
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Shop",
    url: "/shop",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Help",
    url: "/contact",
  },
  {
    title: "Signin/Register",
    url: "/signin",
  },
]);
</script>
<style scoped>
.container {
  padding: 10px;
  width: 100%;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  margin: 10px auto;
  text-align: center;
}
.link-wrapper {
  margin: 10px 0px;
}
.router-link {
  text-decoration: none;
  font-size: 15px !important;
  font-weight: 300 !important;
  color: #000 !important;
  font-family: "Poppins", sans-serif !important;
}
.router-link-container {
  padding-top: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cbcbcbff;
}
</style>
