<route lang="json">
{
  "meta": {
    "layout": "main",
    "requireAuth": true,
    "role": "user"
  }
}
</route>
<template>
  <main>
    <v-container>
      <v-toolbar color="#000" title="User Account"> </v-toolbar>

      <div
        :class="[mdAndUp ? 'flex-row' : 'flex-column', 'd-flex']"
        style="gap: 2rem"
      >
        <v-tabs v-model="tab" color="#000" direction="vertical">
          <v-tab
            prepend-icon="mdi-account"
            text="Account Details"
            value="option-1"
            class="mb-4"
          ></v-tab>
          <v-tab
            prepend-icon="mdi-lock"
            text="Security Settings"
            value="option-2"
            class="mb-4"
          ></v-tab>
          <v-tab
            prepend-icon="mdi-cart"
            text="Order History"
            value="option-3"
            class="mb-4"
          ></v-tab>
          <button @click="handleLogout" style="color: red">Logout</button>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="option-1">
            <div class="form" action="#" method="post">
              <div class="form-group">
                <input
                  v-model="details.fullname"
                  type="text"
                  id="name"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="details.email"
                  type="text"
                  id="email"
                  class="form-control"
                  readonly
                />
              </div>
              <div class="form-group">
                <input
                  v-model="details.phone"
                  type="text"
                  id="email"
                  class="form-control"
                />
              </div>
              <div class="mb-1 form-group">
                <textarea
                  id="message"
                  v-model="details.address"
                  placeholder=" Enter Address"
                  class="form-control"
                ></textarea>
              </div>
            </div>
            <PrimaryButton
              :isDisable="isPending"
              @press="handleClick"
              styles="background-color:#000; color:#fff;"
            >
              Save Changes
            </PrimaryButton>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2">
            <v-card flat>
              <div class="form" action="#" method="post">
                <div class="form-group">
                  <input
                    v-model="password.currentPassword"
                    type="password"
                    id="cpassword"
                    class="form-control"
                  />
                  <label for="cpassword">Current Password</label>
                </div>
                <div class="form-group">
                  <input
                    v-model="password.newPassword"
                    type="password"
                    id="npassword"
                    class="form-control"
                  />
                  <label for="npassword">New Password</label>
                </div>
                <div class="form-group">
                  <input
                    v-model="password.confirmPassword"
                    type="password"
                    id="passwordc"
                    class="form-control"
                  />
                  <label for="passwordc">Confirm New Password</label>
                </div>
              </div>
              <PrimaryButton
                @press="handlePasswordUpdate"
                :isDisable="isPasswordPending"
                styles="background-color:#000; color:#fff;"
              >
                Update Password
              </PrimaryButton>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-3">
            <v-card flat>
              <v-data-table
                :header="[
                  { text: 'Order ID', value: 'orderId' },
                  { text: 'Date', value: 'date' },
                  { text: 'Status', value: 'status' },
                  { text: 'Total', value: 'total' },
                ]"
                :items="
                  auth.details.orders.map((order) => ({
                    orderId: order.id,
                    status: order.status,
                    date: new Date(order.createdAt).toLocaleDateString(),
                    total: `₦${order.total}`,
                  }))
                "
                class="elevation-1"
              >
                <template #item.status="{ item }">
                  <v-chip
                    :color="
                      item.status === 'delivered'
                        ? 'green'
                        : item.status === 'processing'
                        ? 'blue'
                        : 'red'
                    "
                    dark
                  >
                    {{ item.status }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-container>
  </main>
</template>

<script setup>
const tab = ref("option-1");
import { useDisplay } from "vuetify";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import UserService from "@/services/UserService";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const isPending = ref(false);
const isPasswordPending = ref(false);
const { mdAndUp } = useDisplay();
const details = ref(auth.details);
const password = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const updateUsermutation = useMutation({
  mutationFn: UserService.updateUserDetails,
  onSuccess: (resp) => {
    toast.success("Details updated succesfully");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
const updatePasswordmutation = useMutation({
  mutationFn: UserService.updateUserPassword,
  onSuccess: (resp) => {
    toast.success("Password updated succesfully");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
async function handleClick(e) {
  isPending.value = true;
  await updateUsermutation.mutateAsync(details.value, {
    onSettled: (resp) => {
      if (resp) {
        auth.updateDetails(resp.data);
      }
      isPending.value = false;
    },
  });
}
async function handlePasswordUpdate(e) {
  if (password.value.newPassword.length < 8) {
    return toast.error("password must be atleast 8 character long");
  }
  if (password.value.newPassword != password.value.confirmPassword) {
    return toast.error("password do not match");
  }
  isPasswordPending.value = true;
  await updatePasswordmutation.mutateAsync(password.value, {
    onSettled: (resp) => {
      isPasswordPending.value = false;
    },
  });
}
function handleLogout() {
  auth.logout();
  router.replace("/signin");
}
</script>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 5rem;
  padding-bottom: 1rem;
}
.form label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Poppins", sans-serif;
}
.form {
  min-width: 800px;
  margin: 20px 10px;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  width: 100%;
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
.form .form-control {
  width: 100%;
  padding: 0.65rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
  outline: none;
}
.form .form-control:focus + label {
  font-size: 12px;
  font-weight: 500;
  top: 0%;
  transform: translateY(-4px);
}
@media (max-width: 1024px) {
  .form {
    min-width: 600px;
    margin: 20px 0px;
    padding: 1rem;
  }
}
@media (max-width: 978px) {
  .form {
    min-width: 100%;
    margin: 20px 0px;
    padding: 1rem;
  }
}
</style>
