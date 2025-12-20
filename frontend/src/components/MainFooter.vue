<template>
  <div class="footer">
    <v-container>
      <div class="newletter-wrapper">
        <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        <div class="newletter-form">
          <div class="input-wrapper position-relative">
            <i class="pi pi-envelope"></i>
            <input type="text" placeholder="Enter you email address" />
          </div>
          <PrimaryButton
            styles="background-color:white;  color:#000; width:100%;"
            >Subscribe to newsletter</PrimaryButton
          >
        </div>
      </div>
      <div class="footer-content">Contents</div>
    </v-container>
  </div>
</template>

<script setup></script>

<style scoped lang="css">
.footer {
  padding: 20px;
  background-color: #f0eeed;
}
.newletter-wrapper {
  padding: 40px 60px;
  background-color: #000;
  border-radius: 10px;
  position: relative;
  top: -120px;
  display: flex;
  justify-content: space-between;
}
.newletter-wrapper h2 {
  font-size: 40px;
  line-height: 45px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  max-width: 50%;
  color: #fff;
}
.footer-content {
  width: 100%;
  margin-top: -80px;
}
.newletter-form {
  width: 300px;
}
.input-wrapper {
  width: 100%;
  height: 42px;
  margin-bottom: 10px;
}
.input-wrapper i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
}
.input-wrapper input {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  color: #000;
  padding: 10px 50px;
  outline: none;
  border: none;
}
@media (max-width: 1024px) {
  .newletter-wrapper {
    padding: 30px 50px;
  }
  .footer {
    padding: 0;
  }
  .newletter-form {
    width: 250px;
  }
  .newletter-wrapper h2 {
    font-size: 36px;
  }
}
@media (max-width: 768px) {
  .newletter-wrapper {
    flex-direction: column;
    gap: 10px;
    padding: 25px 45px;
  }
  .newletter-wrapper h2 {
    max-width: 100%;
  }
  .newletter-form {
    width: 100%;
  }
}
@media (max-width: 468px) {
  .newletter-wrapper h2 {
    font-size: 32px;
  }
  .newletter-wrapper {
    padding: 15px 35px;
  }
}
</style>
