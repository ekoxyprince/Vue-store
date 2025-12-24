<template>
  <button @click="handleClick" :style="styles" :class="class">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  styles: String,
  class: String,
});
const emits = defineEmits(["press"]);
function handleClick() {
  emits("press");
}
</script>

<style scoped>
button {
  display: flex;
  flex-direction: row;
  padding: 10px 35px;
  border-radius: 25px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.15);
  transition: all 0.53s ease;
  justify-content: center;
}
button:hover {
  opacity: 0.6;
}
button:active {
  box-shadow: none;
}
</style>
