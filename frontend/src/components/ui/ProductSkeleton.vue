<template>
  <v-card>
    <Skeleton width="100%" class="mb-2 card-img-container"></Skeleton>
    <Skeleton width="10rem" class="mb-1"></Skeleton>
    <Skeleton width="10rem" class="mb-1"></Skeleton>
    <Skeleton width="10rem" class="mb-1"></Skeleton>
  </v-card>
</template>

<script setup>
import { Skeleton } from "primevue";
</script>

<style scoped>
.card-img-container {
  height: 298px !important;
}
@media (max-width: 768px) {
  .card-img-container {
    height: 248px !important;
  }
}
@media (max-width: 468px) {
  .card-img-container {
    height: 198px !important;
  }
}
</style>
