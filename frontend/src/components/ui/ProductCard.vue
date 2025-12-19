<template>
  <div class="card">
    <div class="card-img-container">
      <div class="card-img-wrapper">
        <v-img class="img" height="100%" :src="product.image" cover></v-img>
      </div>
    </div>
    <div class="card-content">
      <p>{{ product.name }}</p>
      <div class="rating-wrapper">
        <div>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-half-fill"></i>
        </div>
        <p>{{ product.rating }}/5</p>
      </div>
      <div>
        <p>${{ product.finalPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  product: Object,
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}
.card-img-container {
  width: 295px;
  height: 298px;
  background-color: #f0eeed;
  border-radius: 20px;
  overflow: hidden;
}
.card-img-container:hover .img {
  transform: scale(1.25) !important;
}
.card-img-wrapper {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
}
.card-content {
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.card-content p {
  font-size: 20px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.rating-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
.rating-wrapper p {
  font-size: 14px;
  font-weight: 300;
  font-family: "Poppins", sans-serif;
}
.rating-wrapper i {
  margin-right: 5px;
  color: #ffc633;
}
@media (max-width: 768px) {
  .card-img-container {
    width: 250px;
    height: 248px;
  }
  .card-content p {
    font-size: 18px;
  }
}
@media (max-width: 468px) {
  .card-img-container {
    width: 200px;
    height: 198px;
  }
  .card-content p {
    font-size: 15px;
  }
}
</style>
