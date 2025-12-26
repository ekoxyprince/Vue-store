<template>
  <aside>
    <RouterLink
      class="side-link"
      active-class="side-link-active"
      to="/admin/dashboard"
    >
      <i class="pi pi-home"></i>
      Dashboard
    </RouterLink>
    <RouterLink
      class="side-link"
      active-class="side-link-active"
      to="/admin/users"
    >
      <i class="pi pi-users"></i>
      Users
    </RouterLink>
    <RouterLink
      class="side-link"
      active-class="side-link-active"
      to="/admin/products"
    >
      <i class="pi pi-amazon"></i>
      Products
    </RouterLink>
    <RouterLink
      class="side-link"
      active-class="side-link-active"
      to="/admin/orders"
    >
      <i class="pi pi-shopping-cart"></i>
      Orders
    </RouterLink>
  </aside>
</template>

<script setup></script>

<style scoped>
aside {
  padding: 10px 0px;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
}
.side-link {
  width: 100%;
  padding: 10px 20px;
  font-size: 17px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  color: #000;
  transition: all 0.53s ease;
  display: flex;
  gap: 10px;
}
.side-link i {
  font-size: 20px;
}
.side-link-active {
  background-color: #000;
  border-left: 8px solid #d27070ff;
  color: #fff;
}
</style>
