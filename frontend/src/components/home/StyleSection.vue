<template>
  <v-container
    style="background-color: #f2f0f1; margin-top: 20px; border-radius: 20px"
  >
    <h2 class="header">Browse By Dress Style</h2>
    <div class="grid-container">
      <div
        class="grid-item"
        v-for="style in dressStyles"
        :key="style.title"
        :style="[`background-image:url(${style.image});`]"
      >
        <h2 class="title">{{ style.title }}</h2>
      </div>
    </div>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import img1 from "@/assets/casual.png";
import img2 from "@/assets/image12.png";
import img3 from "@/assets/image13.png";
import img4 from "@/assets/image14.png";
const dressStyles = ref([
  {
    image: img1,
    title: "Casual",
  },
  {
    image: img3,
    title: "Formal",
  },
  {
    image: img2,
    title: "Party",
  },
  {
    image: img4,
    title: "Gym",
  },
]);
</script>

<style scoped>
.title {
  font-size: 24px;
}
.header {
  font-size: 48px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  text-align: center;
  margin: 2rem 0px 2rem 0px;
}
.grid-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
}
.grid-item {
  height: 289px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
}

.grid-item:nth-child(2),
.grid-item:nth-child(3) {
  grid-column: span 3;
  background-size: cover;
}
.grid-item:nth-child(1),
.grid-item:nth-child(4) {
  grid-column: span 2;
  background-size: cover;
}
@media (max-width: 768px) {
}
@media (max-width: 468px) {
  .grid-container {
    grid-template-columns: 1fr;
    padding: 10px;
  }
  .grid-item {
    height: 190px;
    grid-column: span 1 !important;
    /* background-size: 100% 100% !important; */
  }
}
</style>
