<template>
  <div @click="handleClick" class="cart-container">
    <div class="cart-image-container">
      <v-img class="cart-image" :src="image" />
    </div>
    <div class="cart-details">
      <div class="cart-details-row">
        <h2>{{ item?.name }}</h2>
        <v-btn icon size="small" variant="text" color="#000"> </v-btn>
      </div>
      <div class="cart-details-row">
        <h1>₦{{ Number(item?.finalPrice).toLocaleString("en-us") }}</h1>
        <div class="input-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import image from "@/assets/hero-1.png";
const props = defineProps({
  item: {
    type: Object,
  },
});
const emits = defineEmits(["route"]);
const handleClick = () => {
  emits("route");
};
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #cdcdcdff;
  cursor: pointer;
}
.cart-container:last-child {
  border-bottom: none;
}
.cart-image-container {
  width: 140px;
  height: 100px;
  background-color: #f0eeed;
  border-radius: 15px;
  overflow: hidden;
}
.cart-image {
  width: 100%;
  height: 100%;
}
.cart-details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-self: stretch;
  width: 100%;
}
.cart-details-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.cart-details-row:last-child {
  margin-top: auto;
}

.cart-details-row h2 {
  font-size: 20px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.cart-details-row h1 {
  font-size: 22px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  width: max-content;
  border-radius: 15px;
  height: 30px;
  background-color: #f1f1f1ff;
}
.input-wrapper i {
  padding: 2px 10px;
}
.input-wrapper input {
  max-width: 40px;
  text-align: center;
  outline: none;
  border: none;
}
@media (max-width: 768px) {
  .cart-details-row h2 {
    font-size: 17px;
  }
  .cart-details-row h1 {
    font-size: 19px;
  }
}
@media (max-width: 468px) {
  .cart-image-container {
    width: 100px;
    height: 80px;
  }
  .cart-details-row h2 {
    font-size: 15px;
  }
  .cart-details-row h1 {
    font-size: 17px;
  }
}
</style>
