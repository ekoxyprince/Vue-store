<template>
  <div class="card-product">
    <div class="card-img-container">
      <div class="card-img-wrapper">
        <v-img
          class="img"
          height="100%"
          :src="product.images[0].url"
          cover
        ></v-img>
        <button
          v-if="!cart.items.some((it) => it.product.id === product.id)"
          @click="addToCart.call(this, product)"
          class="add-to-cart-btn"
        >
          Add to cart
        </button>
        <button class="add-to-cart-btn" v-else>
          <RouterLink style="color: #fff" to="/cart">View in cart</RouterLink>
        </button>
      </div>
    </div>
    <div class="card-content">
      <RouterLink
        class="name"
        style="color: #000"
        :to="`/shop/${product.id}`"
        >{{ product.name }}</RouterLink
      >
      <div class="rating-wrapper">
        <v-rating
          hover
          :length="5"
          :size="mdAndUp ? 24 : 18"
          :model-value="Number(product.averageRating).toFixed(1)"
          color="#ffc633"
          active-color="#ffc633"
          readonly
        />
        <p>{{ Number(product.averageRating).toFixed(1) }}/5</p>
      </div>
      <div class="price-wrapper">
        <p>₦{{ Number(product.finalPrice).toLocaleString("en-us") }}</p>
        <p style="text-decoration: line-through; color: #888">
          ₦{{ Number(product.price).toLocaleString("en-us") }}
        </p>
        <div class="discount-wrapper">
          {{ Number(product.discount).toFixed(0) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import { useDisplay } from "vuetify";
import { useCartStore } from "@/stores/cart";
import toast from "vue3-hot-toast";
const { mdAndUp } = useDisplay();
const cart = useCartStore();
function addToCart(product) {
  cart.addToCart({ product, quantity: 1 });
  toast.success("added to cart");
}
defineProps({
  product: Object,
});
</script>

<style scoped>
.card-product {
  display: flex;
  flex-direction: column;
}
.card-img-container {
  width: 100%;
  height: 298px;
  background-color: #f0eeed;
  border-radius: 20px;
  overflow: hidden;
}
.card-img-container:hover .img {
  transform: scale(1.25) !important;
}
.card-img-container:hover .add-to-cart-btn {
  bottom: 20px;
  opacity: 1;
}
.card-img-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.add-to-cart-btn {
  position: absolute;
  bottom: -100%;
  left: 10px;
  right: 10px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 100;
  cursor: pointer;
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
.name {
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
.price-wrapper {
  display: flex;
  gap: 5px;
  align-items: center;
  flex-wrap: wrap;
}
.price-wrapper p {
  font-size: 18px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.discount-wrapper {
  background-color: rgba(255, 51, 51, 0.2);
  color: #ff3333;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
}
@media (max-width: 768px) {
  .card-img-container {
    height: 248px;
  }
  .name {
    font-size: 18px;
  }
}
@media (max-width: 468px) {
  .card-img-container {
    height: 198px;
  }
  .name {
    font-size: 15px;
  }
  .add-to-cart-btn {
    bottom: 20px;
    opacity: 1;
  }
  .price-wrapper p {
    font-size: 12px;
    font-weight: 600;
  }
  .discount-wrapper {
    padding: 3px 8px;
  }
}
</style>
