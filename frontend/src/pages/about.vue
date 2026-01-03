<route lang="json">
{
  "meta": {
    "layout": "main"
  }
}
</route>
<template>
  <main>
    <PageTitle title="About Us" />
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-img :src="bg" alt="About Us Image"></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Style Of The 21st century</h2>
          <p>
            Welcome to our online store! We are dedicated to providing you with
            the best products and services. Our mission is to offer a wide range
            of high-quality items at competitive prices, ensuring customer
            satisfaction every step of the way.
          </p>
          <p>
            Our team is passionate about curating a diverse selection of
            products that cater to various tastes and preferences. From the
            latest trends to timeless classics, we strive to bring you the best
            of everything.
          </p>
          <p>
            Thank you for choosing our store. We look forward to serving you and
            helping you find exactly what you're looking for. Happy shopping!
          </p>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup>
import PageTitle from "@/components/ui/PageTitle.vue";
import bg from "@/assets/about.jpeg";
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
h2 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin-bottom: 1rem;
}
p {
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
  line-height: 1.6;
}
</style>
