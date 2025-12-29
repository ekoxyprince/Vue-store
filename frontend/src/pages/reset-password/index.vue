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
        <h2>Reset your password</h2>
        <div class="mb-4 form-group">
          <input v-model="email" type="email" id="email" class="form-control" />
          <label for="email">Email</label>
        </div>
        <PrimaryButton
          :isDisable="isPending"
          styles="width: 100%;background-color:#000; color:#fff;"
        >
          Reset Password
        </PrimaryButton>
      </form>
    </v-container>
  </main>
</template>
<script setup>
import { onMounted } from "vue";
import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import AuthService from "@/services/AuthService";

const isPending = ref(false);
const email = ref("");
const mutation = useMutation({
  mutationFn: AuthService.forgotPassword,
  onSuccess: (resp) => {
    console.log(resp);
    toast.success("Password reset link sent");
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
    },
    {
      onSettled: (resp) => {
        isPending.value = false;
      },
    }
  );
}
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
