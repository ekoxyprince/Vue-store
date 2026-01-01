<template>
  <section class="section">
    <v-container>
      <div class="head">
        <h2 class="header">our happy customers</h2>
        <div class="pagination-wrapper">
          <i @click="slideLeft" class="pi pi-arrow-left"></i>
          <i @click="slideRight" class="pi pi-arrow-right"></i>
        </div>
      </div>
    </v-container>
    <div class="carousel">
      <div class="wrapper">
        <TestimonialSkeleton
          v-for="value in Array(10).fill(10)"
          v-if="isFetching"
        />
        <TestimonyCard
          v-for="review in data.data"
          :review="review"
          :key="review.id"
          v-else
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import ReviewService from "@/services/ReviewService";
import TestimonialSkeleton from "../ui/TestimonialSkeleton.vue";
const { data, isFetching } = useQuery({
  queryKey: ["some-testimonials"],
  queryFn: () => ReviewService.getAllReviews({ page: 1, limit: 10 }),
});
function slideRight() {
  const slide = document.querySelector(".carousel");
  const wrapper = document.querySelector(".wrapper");
  console.log(slide.clientWidth);
  wrapper.scrollBy({ left: slide.clientWidth, behavior: "smooth" });
}
function slideLeft() {
  const slide = document.querySelector(".carousel");
  const wrapper = document.querySelector(".wrapper");
  wrapper.scrollBy({ left: -slide.clientWidth, behavior: "smooth" });
}
</script>

<style scoped>
.section {
  margin-bottom: 150px;
}
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
.carousel {
  width: 100%;
  position: relative;
}
.wrapper {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 340px;
  gap: 15px;
  margin-bottom: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0px 10px;
  scroll-snap-type: x mandatory;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
.carousel::before,
.carousel::after {
  content: "";
  width: 115px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(1.2px);
  position: absolute;
  top: 0;
}
.carousel::after {
  right: 0%;
}
.carousel::before {
  left: 0%;
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
  .wrapper {
    grid-auto-columns: 320px;
  }
  .carousel::before,
  .carousel::after {
    width: 0;
  }
}
</style>
