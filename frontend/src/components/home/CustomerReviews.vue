<template>
  <v-container>
    <div class="head">
      <h2 class="header">our happy customers</h2>
      <div class="pagination-wrapper">
        <i class="pi pi-arrow-left"></i>
        <i class="pi pi-arrow-right"></i>
      </div>
    </div>
  </v-container>
</template>

<script setup></script>

<style scoped>
.head {
  display: flex;
  font-family: "Poppins", sans-serif;
  margin: 1.5rem 0px 1.5rem 0px;
  max-height: 48px;
  align-items: center;
  justify-content: space-between;
}
.header {
  font-size: 48px;
  font-weight: bold;
  text-transform: uppercase;
  max-width: 65%;
}
.pagination-wrapper {
  align-self: flex-end;
}
.pagination-wrapper i {
  cursor: pointer;
}
.pagination-wrapper i:hover {
  opacity: 0.7;
}
.pagination-wrapper i:last-child {
  margin-left: 10px;
}
@media (max-width: 768px) {
  .header {
    font-size: 40px;
    line-height: 36px;
  }
}
@media (max-width: 468px) {
  .header {
    font-size: 32px;
  }
}
</style>
