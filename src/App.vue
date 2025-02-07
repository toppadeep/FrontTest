<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from "vue";

const theme = ref(localStorage.getItem("theme") || "light");

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
  localStorage.setItem("theme", theme.value);
};

// Устанавливаем тему при загрузке
onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
});
</script>

<template>
  <div>
    
  </div>
</template>

<style lang="sass" scoped>

</style>
