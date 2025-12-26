<template>
  <main>
    <v-container>
      <v-breadcrumbs :items="['home', 'cart']"></v-breadcrumbs>
      <h2 class="header">Your Cart</h2>
      <div class="card-wrapper">
        <div class="cart-items-wrapper">
          <CartContainer />
          <CartContainer />
          <CartContainer />
        </div>
        <div class="cart-checkout-wrapper">
          <h2 class="summary-title">Order Summary</h2>
          <div class="summary-wrapper">
            <div class="summary-row">
              <p class="summary-title-checkout">Subtotal</p>
              <p class="summary-text">$0.00</p>
            </div>
            <div class="summary-row">
              <p class="summary-title-checkout">Discount (-0%)</p>
              <p style="color: red" class="summary-text">-$0.00</p>
            </div>
            <div class="summary-row">
              <p class="summary-title-checkout">Delivery Fee</p>
              <p class="summary-text">$0.00</p>
            </div>
          </div>
          <div class="summary-row">
            <p class="summary-title-checkout">Total</p>
            <p class="summary-text">$0.00</p>
          </div>
          <div class="coupon-wrapper">
            <div class="input-wrapper">
              <i class="pi pi-tag"></i>
              <input type="text" placeholder="Add promo code" />
            </div>
            <PrimaryButton styles="background-color:#000; color:#fff; "
              >Apply</PrimaryButton
            >
          </div>
          <PrimaryButton
            styles="background-color:#000; color:#fff; width:100%; display:flex;gap:10px; align-items:center;"
            ><p>Proceed to Checkout</p>
            <i class="pi pi-arrow-right"></i
          ></PrimaryButton>
        </div>
      </div>
    </v-container>
  </main>
</template>
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 5rem;
  padding-bottom: 1rem;
}
.header {
  font-size: 40px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  text-align: start;
  text-transform: uppercase;
}
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px;
}
.cart-items-wrapper {
  grid-column: span 4;
  border: 1px solid #cdcdcdff;
  padding: 20px;
  border-radius: 10px;
}
.cart-checkout-wrapper {
  grid-column: span 3;
  border: 1px solid #cdcdcdff;
  padding: 20px;
  border-radius: 10px;
  align-self: flex-start;
}
.summary-title {
  font-size: 24px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.summary-wrapper {
  padding: 5px 4px;
  border-bottom: 1px solid #cdcdcdff;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
}
.summary-title-checkout {
  font-size: 20px;
  font-weight: 200;
  font-family: "Poppins", sans-serif;
  color: #676767ff;
}
.summary-text {
  font-size: 20px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: #000;
}
.coupon-wrapper {
  display: flex;
  gap: 10px;
  margin: 10px 0px;
}
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  position: relative;
}
.input-wrapper input {
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  padding-left: 30px;
}
.input-wrapper i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  color: #676767ff;
}
@media (max-width: 468px) {
  .summary-title-checkout,
  .summary-text {
    font-size: 16px;
  }
  .cart-items-wrapper {
    padding: 5px;
  }
  .card-wrapper {
    grid-template-columns: 1fr;
  }
  .cart-items-wrapper {
    grid-column: span 1;
  }
  .cart-checkout-wrapper {
    grid-column: span 1;
    margin-top: 20px;
  }
  .input-wrapper input {
    font-size: 14px;
  }
}
</style>
