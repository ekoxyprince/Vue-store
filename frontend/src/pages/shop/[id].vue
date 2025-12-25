<template>
  <main>
    <v-container>
      <v-breadcrumbs
        :items="['home', 'shop', 'product details']"
      ></v-breadcrumbs>
      <div>
        <div class="wrapper">
          <div class="gallery">
            <div class="image-container">
              <div
                v-for="image in product.images"
                :class="[
                  'img-wrapper',
                  image == selectedImage ? 'selected' : '',
                ]"
              >
                <v-img
                  @click="selectImage.call(this, image)"
                  class="img"
                  :src="image"
                  cover
                ></v-img>
              </div>
            </div>
            <div class="main-image">
              <v-img class="image" :src="selectedImage" cover></v-img>
            </div>
          </div>
          <div class="details">
            <h2 class="name" style="color: #000">{{ product.name }}</h2>
            <div class="rating-wrapper">
              <v-rating
                hover
                :length="5"
                :size="24"
                :model-value="product.rating"
                color="#ffc633"
                active-color="#ffc633"
                readonly
              />
              <p>{{ product.rating }}/5</p>
            </div>
            <div class="price-wrapper">
              <p>${{ product.finalPrice }}</p>
            </div>
            <p class="para">
              {{ product.description }}
            </p>
            <div class="card flex align-items-center gap-3">
              <div class="input-wrapper">
                <i @click="decreaseCount" class="pi pi-minus"></i>
                <input v-model="quantity" type="number" />
                <i @click="increaseCount" class="pi pi-plus"></i>
              </div>
              <PrimaryButton styles="background-color:#000; color:#fff;"
                >Add to Cart</PrimaryButton
              >
            </div>
          </div>
        </div>
        <v-tabs v-model="tab" color="#000">
          <v-tab value="one">Product Details</v-tab>
          <v-tab value="two">Product Reviews</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <v-sheet>
              <div class="">
                {{ product?.details }}
              </div>
            </v-sheet>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <v-sheet>
              <h2 class="review-header">
                Total Reviews
                <span style="font-size: 18px; opacity: 0.5">(125)</span>
              </h2>
              <div class="testimony-card-wrapper">
                <TestimonyCard />
                <TestimonyCard />
              </div>
            </v-sheet>
          </v-tabs-window-item>
        </v-tabs-window>
        <h2 class="header">You might also like</h2>
        <div class="card-wrapper-horizontal">
          <ProductCard
            v-for="product in products.slice(0, 4)"
            :product="product"
          />
        </div>
      </div>
    </v-container>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";
import products from "@/constants/products";
import { onMounted, onUnmounted, watch } from "vue";
const route = useRoute();
const product = computed(() => products.find((P) => P.id == route.params.id));
const selectedImage = ref(product.value.images[0]);
const quantity = ref(1);
const tab = ref("one");
const selectImage = (image) => {
  selectedImage.value = image;
};
function animateImages() {
  const index = product.value.images.findIndex(
    (p) => p === selectedImage.value
  );
  if (index < product.value.images.length - 1) {
    selectedImage.value = product.value.images[index + 1];
  } else {
    selectedImage.value = product.value.images[0];
  }
}
const increaseCount = () => {
  if (quantity.value < 100) {
    quantity.value += 1;
  }
};
const decreaseCount = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};
let interval;
onMounted(() => {
  interval = setInterval(animateImages, 2000);
});
onUnmounted(() => {
  clearInterval(interval);
});
watch(selectedImage, (val) => {});
</script>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 5rem;
  padding-bottom: 1rem;
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.gallery {
  padding: 10px;
  display: flex;
  height: 400px;
  gap: 10px;
}
.details {
  padding: 10px;
}
.image-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  min-height: 0;
  flex: 1;
}
.img-wrapper {
  width: 100px;
  flex: 1;
  min-height: 0;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ccc;
}
.img-wrapper .img {
  width: 100%;
  height: 100%;
}
.selected {
  border: 2px solid green;
}
.main-image {
  width: 100%;
  min-height: 0;
  overflow: hidden;
  transition: all 0.53s ease;
}
.main-image .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.name {
  font-size: 40px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  line-height: 42px;
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
}
.price-wrapper p {
  font-size: 32px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.para {
  font-size: 14px;
  font-weight: 300;
  font-family: "Poppins", sans-serif;
}
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  width: max-content;
  border-radius: 5px;
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
.card {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 10px 0px;
}
.testimony-card-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.review-header {
  font-size: 24px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.header {
  font-size: 48px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  text-align: center;
  margin: 3rem 0px 1.5rem 0px;
  text-transform: uppercase;
}
.card-wrapper-horizontal {
  display: grid;
  grid-auto-columns: 300px;
  grid-auto-flow: column;
  gap: 20px;
  overflow-x: auto;
}
.card-wrapper-horizontal::-webkit-scrollbar {
  display: none;
}
@media (max-width: 768px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
  .gallery {
    flex-direction: column-reverse;
    width: 100%;
  }
  .image-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .img-wrapper {
    width: 100%;
    height: 70px;
  }
  .main-image {
    height: 300px;
  }
  .testimony-card-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  .header {
    font-size: 40px;
    line-height: 36px;
  }
  .card-wrapper-horizontal {
    grid-auto-columns: 255px;
  }
}
@media (max-width: 468px) {
  .testimony-card-wrapper {
    grid-template-columns: 1fr;
  }
  .name {
    font-size: 24px;
    line-height: 28px;
  }
  .price-wrapper p {
    font-size: 24px;
    line-height: 28px;
  }
  .header {
    font-size: 32px;
  }
  .card-wrapper-horizontal {
    grid-auto-columns: 205px;
  }
}
</style>
