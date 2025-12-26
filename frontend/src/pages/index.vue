<template>
  <HeroSection />
  <NewArrivals />
  <TopSelling />
  <StyleSection />
  <CustomerReviews />
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
