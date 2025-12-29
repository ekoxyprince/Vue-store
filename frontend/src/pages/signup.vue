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
      <form @submit="handleClick" action="#" method="post">
        <h2>Register Account</h2>
        <div class="form-group">
          <input
            v-model="fullname"
            type="text"
            id="fullname"
            class="form-control"
          />
          <label for="fullname">Fullname</label>
        </div>
        <div class="form-group">
          <input v-model="email" type="email" id="email" class="form-control" />
          <label for="email">Email</label>
        </div>
        <div class="form-group">
          <input v-model="phone" type="text" id="phone" class="form-control" />
          <label for="phone">Phone</label>
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
          />
          <label for="password">Password</label>
        </div>
        <div class="mb-1 form-group">
          <textarea
            id="message"
            v-model="address"
            placeholder=" Enter Address"
            class="form-control"
          ></textarea>
        </div>
        <PrimaryButton
          :isDisable="isPending"
          styles="width: 100%;background-color:#000; color:#fff;"
        >
          Signup
        </PrimaryButton>
        <div class="signup-wrapper">
          <p>already have an account?</p>
          <RouterLink to="/signin">signin</RouterLink>
        </div>
      </form>
    </v-container>
  </main>
</template>
<script setup>
import { onMounted } from "vue";
import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const isPending = ref(false);
const fullname = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const address = ref("");
const mutation = useMutation({
  mutationFn: AuthService.signup,
  onSuccess: (resp) => {
    console.log(resp);
    toast.success("signup successful");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
onMounted(() => {
  window.scrollTo(0, 0);
});
async function handleClick(e) {
  isPending.value = true;
  e.preventDefault();
  await mutation.mutateAsync(
    {
      email: email.value,
      password: password.value,
      phone: phone.value,
      address: address.value,
      fullname: fullname.value,
    },
    {
      onSettled: (resp) => {
        if (resp) {
          const { token, ...user } = resp.data;
          auth.login(token, user);
          router.push("/user");
        }
        isPending.value = false;
      },
    }
  );
}
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<style scoped>
main {
  width: 100%;
  height: 100vh;
  margin-bottom: 5rem;
  padding-bottom: 1rem;
}
h2 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
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
form {
  max-width: 800px;
  margin: 40px auto;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  padding: 0.65rem;
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
.signup-wrapper {
  margin-top: 8px;
  display: flex;
  justify-content: end;
}
@media (max-width: 468px) {
  h2 {
    font-size: 1.3rem;
  }
}
</style>
