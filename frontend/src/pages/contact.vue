<template>
  <main>
    <PageTitle title="Contact Us" />
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2>Contact Information</h2>
          <p>
            Have questions or need assistance? Feel free to reach out to us
            using the contact information below.
          </p>
          <p>Email: support@shop.co</p>
          <p>Phone: +1 (555) 123-4567</p>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Send us a Message</h2>
          <form action="#" method="post">
            <div class="mb-4">
              <label for="name">Name</label>
              <input type="text" id="name" class="form-control" />
            </div>
            <div class="mb-4">
              <label for="email">Email</label>
              <input type="email" id="email" class="form-control" />
            </div>
            <div class="mb-4">
              <label for="message">Message</label>
              <textarea id="message" class="form-control"></textarea>
            </div>
            <PrimaryButton
              styles="width: 100%;background-color:#000; color:#fff;"
            >
              Send Message
            </PrimaryButton>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup>
import PageTitle from "@/components/ui/PageTitle.vue";
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
form label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Poppins", sans-serif;
}
form .form-control {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
}
form .btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
}
form .btn:hover {
  background-color: #0056b3;
}
</style>
