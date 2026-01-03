<route lang="json">
{
  "meta": {
    "layout": "main"
  }
}
</route>
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
          <p>Email: support@aerclothingbrand.ng</p>
          <p>Phone: +234 (704) 705-3308</p>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Send us a Message</h2>
          <form @submit.prevent="submit" action="#" method="post">
            <div class="mb-1 form-group">
              <input
                v-model="formData.name"
                type="text"
                id="name"
                class="form-control"
              />
              <label for="name">Name</label>
            </div>
            <div class="mb-1 form-group">
              <input
                v-model="formData.email"
                type="email"
                id="email"
                class="form-control"
              />
              <label for="email">Email</label>
            </div>
            <div class="mb-1 form-group">
              <input
                v-model="formData.subject"
                type="text"
                id="subject"
                class="form-control"
              />
              <label for="subject">Subject</label>
            </div>
            <div class="mb-1 form-group">
              <textarea
                id="message"
                v-model="formData.message"
                placeholder=" Enter Message Here..."
                class="form-control"
              >
              </textarea>
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
import { onMounted } from "vue";
import NotificationService from "@/services/NotificationService";
import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
const formData = ref({
  email: "",
  name: "",
  subject: "",
  message: "",
});
onMounted(() => {
  window.scrollTo(0, 0);
});
const mutation = useMutation({
  mutationFn: NotificationService.sendNotification,
  onSuccess: (resp) => {
    toast.success("Message sent");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const submit = async (isActive) => {
  await mutation.mutateAsync(formData.value, {
    onSettled: (resp) => {
      formData.value = {};
    },
  });
};
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
.form-group {
  position: relative;
  height: 100%;
}
.form-group label {
  position: absolute;
  top: 20%;
  left: 20px;
  z-index: 100;
  background-color: #fff;
  padding: 0 5px;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
form .form-control {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
  outline: none;
}
form .form-control:focus + label {
  font-size: 12px;
  font-weight: 500;
  top: 0%;
  transform: translateY(-4px);
}
</style>
