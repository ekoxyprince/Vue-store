<template>
  <v-container style="border-bottom: 1px solid #cdcdcdff">
    <h2 class="header">New Arrivals</h2>
    <div class="card-wrapper">
      <ProductCard v-for="product in newArrivals" :product="product" />
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 10px 0px;
      "
    >
      <PrimaryButton
        styles="background-color:white; border:1px solid #eee; color:#000;"
        >View All</PrimaryButton
      >
    </div>
  </v-container>
</template>

<script setup>
import products from "@/constants/products";
const newArrivals = ref(products.filter((d, i) => d.reviewsCount <= 10));
</script>

<style scoped>
.header {
  font-size: 48px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  text-align: center;
  margin: 3rem 0px 1.5rem 0px;
  text-transform: uppercase;
}
.card-wrapper {
  display: grid;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  gap: 20px;
  overflow-x: auto;
}
.card-wrapper::-webkit-scrollbar {
  display: none;
}
@media (max-width: 768px) {
  .header {
    font-size: 40px;
    line-height: 36px;
  }
  .card-wrapper {
    grid-auto-columns: 255px;
  }
}
@media (max-width: 468px) {
  .card-wrapper {
    grid-auto-columns: 205px;
  }
  .header {
    font-size: 32px;
  }
}
</style>
