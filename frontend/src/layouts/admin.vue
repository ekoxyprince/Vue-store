<template>
  <div class="wrapper">
    <div class="navbar">
      <div>Shop.co</div>
      <v-app-bar-nav-icon
        v-if="smAndDown"
        @click.stop="isActive = !isActive"
        variant="text"
      ></v-app-bar-nav-icon>
    </div>
    <div class="container">
      <div class="sidebar">
        <AdminSidebar />
      </div>
      <v-main style="padding: 10px">
        <router-view></router-view>
      </v-main>
    </div>
  </div>
  <v-navigation-drawer
    v-model="isActive"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <AdminSidebar />
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const isActive = ref(false);
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.navbar {
  width: 100%;
  height: 80px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.container {
  display: grid;
  grid-template-columns: 250px auto;
  gap: 10px;
}
.sidebar {
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #eaeaeaff;
}
@media (max-width: 959px) {
  .container {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
}
</style>
