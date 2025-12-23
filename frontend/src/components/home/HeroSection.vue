<template>
  <div style="background-color: #f2f0f1">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <div class="content-wrapper">
            <h2>FIND CLOTHES THAT MATCHES YOUR STYLE</h2>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <PrimaryButton
              class="btn"
              styles="background-color:black; color:#fff !important;"
            >
              <RouterLink style="color: #fff" to="/shop">Shop Now</RouterLink>
            </PrimaryButton>
            <div class="write-ups">
              <div class="write-ups-item">
                <h2>200+</h2>
                <p>International Brands.</p>
              </div>
              <div class="write-ups-item">
                <h2>2,000+</h2>
                <p>High Quality Products.</p>
              </div>
              <div class="write-ups-item">
                <h2>30,000+</h2>
                <p>Happy Customers.</p>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="position-relative" cols="12" md="6" sm="12">
          <v-img class="img" :src="hero"></v-img>
          <v-img class="lgVector" :src="lgVector"></v-img>
          <v-img class="smVector" :src="smVector"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div style="background-color: #000; width: 100%; padding: 10px">
    <v-container>
      <div class="carousel">
        <div class="brands">
          <v-img v-for="images in brands" class="img" :src="images"></v-img>
        </div>
        <div aria-hidden="true" class="brands">
          <v-img v-for="images in brands" class="img" :src="images"></v-img>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import hero from "@/assets/hero-1.png";
import lgVector from "@/assets/Vector.png";
import smVector from "@/assets/Vector-sm.png";
import pat1 from "@/assets/brand-3.png";
import pat2 from "@/assets/brand-5.png";
import pat3 from "@/assets/brand-4.png";
import pat4 from "@/assets/brand-2.png";
import pat5 from "@/assets/brand-1.png";
const brands = [pat1, pat2, pat3, pat4, pat5];
</script>

<style scoped>
.img {
  position: relative;
  bottom: -15px;
}
.content-wrapper > h2 {
  font-size: 64px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0%;
  line-height: 64px;
}
.content-wrapper > p,
.write-ups-item > p {
  font-size: 14.5px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0%;
  line-height: 22px;
}
.write-ups-item > h2 {
  font-size: 40px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.content-wrapper {
  margin: 45px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.lgVector {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 25%;
  right: 0;
}
.smVector {
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: 200px;
}
p {
}
.write-ups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.write-ups-item {
  position: relative;
}
.write-ups-item:nth-child(1)::after,
.write-ups-item:nth-child(2)::after {
  width: 1px;
  height: 100%;
  content: "";
  position: absolute;
  background-color: #ccc;
  top: 0;
  right: 0;
}
.carousel {
  display: flex;
  overflow-x: auto;
  width: 100%;
}
.brands {
  display: flex;
  align-items: center;
  gap: 6rem;
  height: 100%;
  animation: spin 5s infinite linear;
  padding-right: 6rem;
}
.carousel::-webkit-scrollbar {
  display: none;
}
.brands .img {
  height: 30px;
  flex-grow: 1;
  flex-shrink: 0;
  min-width: 150px;
  transform: translateY(-50%);
}
.btn {
  align-self: start;
}
@keyframes spin {
  from {
    translate: 0;
  }
  to {
    translate: -100%;
  }
}
@media (max-width: 1024px) {
  .content-wrapper > h2 {
    font-size: 38px;
    line-height: 34px;
  }

  .write-ups-item > h2 {
    font-size: 26px;
  }
  .brands .img {
    height: 28px;
    min-width: 120px;
  }
}
@media (max-width: 468px) {
  .write-ups {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  .write-ups-item:last-child {
    grid-column: span 2;
    justify-self: center;
  }
  .content-wrapper > h2 {
    font-size: 34px;
    line-height: 34px;
  }
  .content-wrapper > p,
  .write-ups-item > p {
    font-size: 11px;
  }
  .write-ups-item > h2 {
    font-size: 24px;
  }
  .btn {
    align-self: stretch;
  }
  .write-ups-item:nth-child(2)::after {
    display: none;
  }
  .content-wrapper {
    margin: 15px 0px;
  }
  .brands .img {
    min-width: 100px;
  }
}
</style>
