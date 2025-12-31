<template>
  <div class="card-testimonial">
    <v-rating
      hover
      :length="5"
      :size="mdAndUp ? 22 : 19"
      :model-value="Number(review.rating).toFixed(1)"
      color="#ffc633"
      active-color="#ffc633"
      readonly
    />
    <h2>{{ review.user.fullname }}</h2>
    <p>"{{ review.review }}”</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const rating = ref(4.5);
defineProps({
  review: {
    type: Object,
  },
});
</script>

<style scoped>
.card-testimonial {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccccccff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-testimonial h2 {
  font-size: 20px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.card-testimonial p {
  font-size: 13.5px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
}
@media (max-width: 468px) {
  .card-testimonial {
    scroll-snap-align: center;
  }
}
</style>
