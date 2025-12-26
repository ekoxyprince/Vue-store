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
          <button style="color: red">Logout</button>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="option-1">
            <div class="form" action="#" method="post">
              <div class="form-group">
                <input type="text" id="name" class="form-control" />
                <label for="name">Fullname</label>
              </div>
              <div class="form-group">
                <input type="text" id="email" class="form-control" />
                <label for="email">Email</label>
              </div>
              <div class="form-group">
                <input type="text" id="email" class="form-control" />
                <label for="email">Phone</label>
              </div>
              <div class="mb-1 form-group">
                <textarea
                  id="message"
                  placeholder=" Enter Address"
                  class="form-control"
                ></textarea>
              </div>
            </div>
            <PrimaryButton styles="background-color:#000; color:#fff;">
              Save Changes
            </PrimaryButton>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2">
            <v-card flat>
              <div class="form" action="#" method="post">
                <div class="form-group">
                  <input type="password" id="cpassword" class="form-control" />
                  <label for="cpassword">Current Password</label>
                </div>
                <div class="form-group">
                  <input type="password" id="npassword" class="form-control" />
                  <label for="npassword">New Password</label>
                </div>
                <div class="form-group">
                  <input type="password" id="passwordc" class="form-control" />
                  <label for="passwordc">Confirm New Password</label>
                </div>
              </div>
              <PrimaryButton styles="background-color:#000; color:#fff;">
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
                :items="[
                  {
                    orderId: '1001',
                    date: '2024-01-15',
                    status: 'Delivered',
                    total: '$150.00',
                  },
                  {
                    orderId: '1002',
                    date: '2024-02-20',
                    status: 'Processing',
                    total: '$85.00',
                  },
                  {
                    orderId: '1003',
                    date: '2024-03-05',
                    status: 'Cancelled',
                    total: '$60.00',
                  },
                ]"
                class="elevation-1"
              >
                <template #item.status="{ item }">
                  <v-chip
                    :color="
                      item.status === 'Delivered'
                        ? 'green'
                        : item.status === 'Processing'
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
const { mdAndUp } = useDisplay();
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
