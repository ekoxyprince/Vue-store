<template>
  <div class="card-container">
    <div class="card-header">
      <p>{{ title }}</p>
      <i :class="['pi', icon]"></i>
    </div>
    <div class="card-bottom">
      <div class="bottom-info">
        <h2>{{ value }}</h2>
        <p>
          <span>{{ amount }}</span>
          today
        </p>
      </div>
      <div class="card-img-container">
        <v-img class="card-img" :src="img"></v-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import img from "@/assets/arrow.png";
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.card-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
.card-header i {
  font-size: 20px;
  font-weight: bold;
}
.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.card-img-container {
  width: 50px;
  height: 50px;
}
.card-img {
  width: 100%;
  height: 100%;
}
.bottom-info h2 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 32px;
}
.bottom-info p {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}
.bottom-info p span {
  color: green;
  font-weight: 600;
}
</style>
