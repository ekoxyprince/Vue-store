<template>
  <div class="footer">
    <v-container>
      <div class="newletter-wrapper">
        <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        <div class="newletter-form">
          <div class="input-wrapper position-relative">
            <i class="pi pi-envelope"></i>
            <input type="text" placeholder="Enter you email address" />
          </div>
          <PrimaryButton
            styles="background-color:white;  color:#000; width:100%;"
            >Subscribe to newsletter</PrimaryButton
          >
        </div>
      </div>
      <div class="footer-content">
        <div class="footer-content-item">
          <h1 class="logo">SHOP.CO</h1>
          <p class="footer-text">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div class="social-links">
            <RouterLink>
              <i class="pi pi-twitter"></i>
            </RouterLink>
            <RouterLink>
              <i class="pi pi-facebook"></i>
            </RouterLink>
            <RouterLink>
              <i class="pi pi-instagram"></i>
            </RouterLink>
            <RouterLink>
              <i class="pi pi-whatsapp"></i>
            </RouterLink>
          </div>
        </div>
        <div class="footer-content-item">
          <h2>Store Links</h2>
          <ul>
            <li><RouterLink class="route-link" to="/">Home</RouterLink></li>
            <li>
              <RouterLink class="route-link" to="/about">About</RouterLink>
            </li>
            <li><RouterLink class="route-link" to="/shop">Shop</RouterLink></li>
            <li>
              <RouterLink class="route-link" to="/contact">Contact</RouterLink>
            </li>
          </ul>
        </div>
        <div class="footer-content-item">
          <h2>Useful Links</h2>
          <ul>
            <li><RouterLink class="route-link" to="/cart">Cart</RouterLink></li>
            <li>
              <RouterLink class="route-link" to="/signin">Signin</RouterLink>
            </li>
            <li>
              <RouterLink class="route-link" to="/signup">Register</RouterLink>
            </li>
          </ul>
        </div>
        <div class="footer-content-item">
          <h2>Our store</h2>
          <ul>
            <li>HeadOffice</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2000-{{ new Date().getFullYear() }}, All rights reserved</p>
        <div style="display: flex; align-items: center; gap: 10px">
          <div v-for="img in array" class="image-wrapper">
            <v-img class="img" :src="img"></v-img>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import pay1 from "@/assets/Mastercard.png";
import pay2 from "@/assets/Visa.png";
import pay3 from "@/assets/Paypal.png";
import pay4 from "@/assets/APay.png";
import pay5 from "@/assets/GPay.png";
const array = ref([pay1, pay2, pay3, pay4, pay5]);
</script>

<style scoped lang="css">
li {
  list-style: none;
}
.logo {
  font-size: 33.45px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.image-wrapper {
  width: 46.61px;
  height: 30.01px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5.38px;
}
.image-wrapper .img {
  width: 32.54px;
  height: 10.51px;
}
.footer-text {
  font-size: 14px;
  font-weight: 400;
  max-width: 80%;
  font-family: "Poppins", sans-serif;
  color: #444444ff;
  margin: 10px 0px;
}
.footer-bottom {
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer-bottom p {
  font-size: 14px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  color: #444444ff;
}
.route-link {
  text-decoration: none;
  font-size: 14px !important;
  font-weight: 300 !important;
  font-family: "Poppins", sans-serif !important;
  line-height: 18px;
  margin-top: 10px;
  color: #444444ff;
}
.route-link:hover {
  opacity: 0.6;
}
ul {
  margin-top: 10px;
}
.footer {
  padding: 20px;
  background-color: #f0eeed;
}
.newletter-wrapper {
  padding: 40px 60px;
  background-color: #000;
  border-radius: 20px;
  position: relative;
  top: -120px;
  display: flex;
  justify-content: space-between;
}
.newletter-wrapper h2 {
  font-size: 40px;
  line-height: 45px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  max-width: 50%;
  color: #fff;
}
.footer-content {
  width: 100%;
  margin-top: -80px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.footer-content-item:first-child {
  grid-column: span 2;
}
.footer-content-item h2 {
  font-size: 16px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  line-height: 18px;
}
.route-link {
  font-size: 16px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  line-height: 18px;
}
.newletter-form {
  width: 300px;
}
.input-wrapper {
  width: 100%;
  height: 42px;
  margin-bottom: 10px;
}
.input-wrapper i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
}
.input-wrapper input {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  color: #000;
  padding: 10px 50px;
  outline: none;
  border: none;
}
.social-links {
  display: flex;
  align-items: center;
  gap: 10px;
}
.social-links i {
  color: #000;
}

@media (max-width: 1024px) {
  .newletter-wrapper {
    padding: 30px 50px;
  }
  .footer {
    padding: 0;
  }
  .newletter-form {
    width: 250px;
  }
  .newletter-wrapper h2 {
    font-size: 36px;
  }
  .footer-text {
    max-width: 90%;
  }
}
@media (max-width: 768px) {
  .newletter-wrapper {
    flex-direction: column;
    gap: 10px;
    padding: 25px 45px;
  }
  .newletter-wrapper h2 {
    max-width: 100%;
  }
  .newletter-form {
    width: 100%;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
}
@media (max-width: 468px) {
  .newletter-wrapper h2 {
    font-size: 32px;
  }
  .newletter-wrapper {
    padding: 15px 35px;
  }
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-text {
    max-width: 100%;
  }
}
</style>
