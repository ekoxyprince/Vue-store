<route lang="json">
{
  "meta": {
    "layout": "main"
  }
}
</route>
<template>
  <main>
    <v-container>
      <v-breadcrumbs
        :items="['home', 'shop', 'product details']"
      ></v-breadcrumbs>
      <div v-if="isFetching" class="card flex justify-center">
        <ProgressSpinner />
      </div>
      <div v-else>
        <div class="wrapper">
          <div class="gallery">
            <div class="image-container">
              <div
                v-for="image in data?.data.images"
                :class="[
                  'img-wrapper',
                  image.url == selectedImage ? 'selected' : '',
                ]"
              >
                <v-img
                  @click="selectImage.call(this, image.url)"
                  class="img"
                  :src="image.url"
                  cover
                ></v-img>
              </div>
            </div>
            <div class="main-image">
              <v-img
                class="image"
                :src="selectedImage || data?.data.images[0].url"
                cover
              ></v-img>
            </div>
          </div>
          <div class="details">
            <h2 class="name" style="color: #000">{{ data?.data.name }}</h2>
            <div class="rating-wrapper">
              <v-rating
                hover
                :length="5"
                :size="24"
                :model-value="Number(data?.data.averageRating).toFixed(1)"
                color="#ffc633"
                active-color="#ffc633"
                readonly
              />
              <p>{{ Number(data?.data.averageRating).toFixed(1) }}/5</p>
            </div>
            <div class="price-wrapper">
              <p>
                ₦{{ Number(data?.data.finalPrice).toLocaleString("en-us") }}
              </p>
            </div>
            <p class="para">
              {{ data?.data.description }}
            </p>
            <div class="card flex align-items-center gap-3">
              <div class="input-wrapper">
                <i @click="decreaseCount" class="pi pi-minus"></i>
                <input v-model="quantity" type="number" />
                <i @click="increaseCount" class="pi pi-plus"></i>
              </div>
              <PrimaryButton
                v-if="!cart.items.some((it) => it.product.id === data?.data.id)"
                @press="addToCart"
                styles="background-color:#000; color:#fff;"
                >Add to Cart</PrimaryButton
              >
              <PrimaryButton v-else styles="background-color:#000; color:#fff;"
                ><RouterLink style="color: #fff" to="/cart"
                  >View in cart</RouterLink
                ></PrimaryButton
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
                {{ data?.data.details }}
              </div>
            </v-sheet>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <v-sheet>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <h2 class="review-header">
                  Total Reviews
                  <span style="font-size: 18px; opacity: 0.5"
                    >({{ data.reviews.length }})</span
                  >
                </h2>
                <v-btn
                  v-if="auth.isAuth && auth.details.role === 'user'"
                  icon
                  size="small"
                  variant="text"
                  color="#000"
                  @click="isActive = true"
                >
                  <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
              </div>
              <div class="testimony-card-wrapper">
                <TestimonyCard
                  v-for="review in data?.reviews"
                  :review="review"
                />
              </div>
            </v-sheet>
          </v-tabs-window-item>
        </v-tabs-window>
        <h2 class="header">You might also like</h2>
        <div class="card-wrapper-horizontal">
          <!-- <ProductCard
            v-for="product in products.slice(0, 4)"
            :product="product"
          /> -->
        </div>
      </div>
    </v-container>
  </main>
  <v-dialog v-model="isActive" max-width="500">
    <template #default="{ isActive }">
      <v-card title="Write a review" max-width="700">
        <v-form ref="form" @submit.prevent="submit(isActive)">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-rating
                  hover
                  :length="5"
                  :size="36"
                  :model-value="formData.rating"
                  v-model="formData.rating"
                  color="#ffc633"
                  active-color="#ffc633"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Review"
                  rows="3"
                  v-model="formData.review"
                  required
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn variant="text" @click="isActive.value = false">
              Cancel
            </v-btn>

            <v-btn color="primary" type="submit"> Save Review </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { useRoute } from "vue-router";
import products from "@/constants/products";
import { onMounted, onUnmounted, watch } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { ProgressSpinner } from "primevue";
import ProductService from "@/services/ProductService";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import toast from "vue3-hot-toast";
import ReviewService from "@/services/ReviewService";
const route = useRoute();
const { data, isFetching } = useQuery({
  queryKey: [`product-${route.params.id}`],
  queryFn: () => ProductService.getProductById({ id: route.params.id }),
});
const cart = useCartStore();
const auth = useAuthStore();
const selectedImage = ref(undefined);
const quantity = ref(1);
const tab = ref("one");
const isActive = ref(false);
const formData = ref({
  rating: 0,
  review: "",
});
const mutation = useMutation({
  mutationKey: ["create-review"],
  mutationFn: ReviewService.create,
  onSuccess: (resp) => {
    toast.success("Review created");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const selectImage = (image) => {
  selectedImage.value = image;
};
function animateImages() {
  const index = data.value?.data.images.findIndex(
    (p) => p.url === selectedImage.value
  );
  if (index < data?.value.data.images.length - 1) {
    selectedImage.value = data.value?.data.images[index + 1].url;
  } else {
    selectedImage.value = data?.value.data.images[0].url;
  }
}
const increaseCount = () => {
  if (quantity.value < data.value?.data.stockCount) {
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
  window.scrollTo(0, 0);
});
onUnmounted(() => {
  clearInterval(interval);
});
watch(selectedImage, (val) => {});
function addToCart() {
  cart.addToCart({ product: data.value?.data, quantity: quantity.value });
  toast.success("added to cart");
}
const submit = async (isActive) => {
  await mutation.mutateAsync(
    { ...formData.value, productId: data.value?.data.id },
    {
      onSettled: (resp) => {
        isActive.value = false;
      },
    }
  );
};
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
