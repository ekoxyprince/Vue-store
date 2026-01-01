<template>
  <v-container style="border-bottom: 1px solid #cdcdcdff">
    <h2 class="header">New Arrivals</h2>
    <div class="card-wrapper">
      <ProductSkeleton v-if="isFetching" v-for="index in Array(4).fill(0)" />
      <ProductCard
        v-for="product in data.data"
        :product="product"
        :key="product.id"
        v-else
      />
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
        @press="handlePress"
        styles="background-color:white; border:1px solid #eee; color:#000;"
        >View All</PrimaryButton
      >
    </div>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import ProductService from "@/services/ProductService";
import ProductSkeleton from "../ui/ProductSkeleton.vue";
const router = useRouter();

const { data, isFetching } = useQuery({
  queryKey: ["new-arivals"],
  queryFn: () => ProductService.getAllProducts({ page: 1, limit: 4 }),
});
const handlePress = () => {
  router.push("/shop");
};
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
