<template>
  <div class="card">
    <v-rating
      hover
      :length="5"
      :size="mdAndUp ? 22 : 19"
      :model-value="rating"
      color="#ffc633"
      active-color="#ffc633"
      readonly
    />
    <h2>Sarah Williams</h2>
    <p>
      "I'm blown away by the quality and style of the clothes I received from
      Shop.co. From casual wear to elegant dresses, every piece I've bought has
      exceeded my expectations.”
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const rating = ref(4.5);
</script>

<style scoped>
.card {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccccccff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card h2 {
  font-size: 20px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.card p {
  font-size: 13.5px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
}
</style>
