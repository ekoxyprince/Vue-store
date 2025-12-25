<template>
  <div class="wrapper">
    <h2
      pAnimateOnScroll
      enterClass="animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000"
      leaveClass="animate-leave fade-out-0"
    >
      {{ title }}
    </h2>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 140px;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.7)
    ),
    url(@/assets/bg.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper h2 {
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
}
</style>
