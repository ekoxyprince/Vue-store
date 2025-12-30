import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCart: function (item) {
      const existsInCart = this.items.some(
        (it) => it.product.id === item.product.id
      );
      if (!existsInCart) {
        this.items.push(item);
      }
    },
    removeFromCart: function (item) {
      this.items = this.items.filter((it) => it.product.id !== item.id);
    },
    increaseQuantity: function (id) {
      const item = this.items.find((it) => it.product.id == id);
      console.log(item, id);
      if (item && item.quantity) item.quantity++;
    },
    decreaseQuantity: function (id) {
      const item = this.items.find((it) => it.product.id == id);
      if (item && item.quantity) item.quantity--;
    },
  },
  persist: true,
});
