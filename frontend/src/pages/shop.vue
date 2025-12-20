<template>
  <main>
    <v-container>
      <v-breadcrumbs :items="['home', 'shop']"></v-breadcrumbs>
      <article>
        <div class="filter">
          <!-- <div style="position: fixed">h</div> -->
        </div>
        <div class="product-wrapper">
          <div class="product-wrapper-title">
            <h2>Casual</h2>
            <div style="display: flex; align-items: center; gap: 5px">
              <p>showing 1-10 of 100 products</p>
              <i v-if="mdAndDown" class="pi pi-filter"></i>
            </div>
          </div>
          <div class="product-grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>
          <Paginator
            v-model:first="page"
            :rows="10"
            :totalRecords="120"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="onPageChange"
          ></Paginator>
        </div>
      </article>
    </v-container>
  </main>
</template>

<script setup>
import products from "@/constants/products";
import { Paginator } from "primevue";
import { ref } from "vue";
import { useDisplay } from "vuetify";
const { mdAndDown } = useDisplay();
const onPageChange = (event) => {
  console.log(event.page);
};
</script>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 5rem;
}
article {
  display: grid;
  grid-template-columns: 300px auto;
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
  }
}
</style>
