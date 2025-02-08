<script setup lang="ts">
import { ref, onMounted } from "vue";
const hover = ref(false);
import ItemViewer from "./components/ItemViewer.vue";
import InventoryWrapper from "./components/InventoryWrapper.vue";
import SkeletonLoader from "./components/SkeletonLoader.vue";

const theme = ref<string>(localStorage.getItem("theme") || "dark");

const toggleTheme = (): void => {
  // Переключаем тему
  if (theme.value === "light") {
    theme.value = "stalker";
  } else if (theme.value === "stalker") {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }

  // Обновляем атрибут data-theme на корневом элементе
  document.documentElement.setAttribute("data-theme", theme.value);

  // Сохраняем выбор в localStorage
  localStorage.setItem("theme", theme.value);
};


onMounted(() => {
  document.documentElement.setAttribute("data-theme", theme.value);
});
</script>

<template>
  <div class="interface">
    <div class="interface--main">
      <ItemViewer />
      <InventoryWrapper />
    </div>
    <div class="essentially__info">
      <SkeletonLoader :width="699" :height="36" :around="12" />
      <img src="./assets/carbon_close.png" alt="Close" />
    </div>
  </div>
  <div class="container">
    <button class="theme-toggle-btn" @click="toggleTheme()" @mouseover="hover = true" @mouseleave="hover = false">
      <i class="fas fa-cogs"></i>
      <span v-if="hover" class="tooltip">Сменить тему</span>
    </button>
  </div>
</template>

<style lang="sass" scoped>

@use "./styles/mixins.scss" as mixin
@use "./styles/variables.scss" as variables

.interface
  @include mixin.center()
  display: flex
  width: 785px
  flex-flow: row wrap
  .interface--main
    display: flex
    width: 100%
    padding-bottom: 1em
    flex-flow: row nowrap
    justify-content: center
    position: relative
  .essentially__info
    @include mixin.center()
    @include mixin.border()
    position: relative
    width: 100%
    height: 72px
    background: var(--primary)
    img
      position: absolute
      top: 8px
      right: 8px
      cursor: pointer
      .container
  position: relative

.theme-toggle-btn
  @include mixin.border()
  position: absolute
  bottom: 50%
  left: 20%
  width: 50px
  height: 50px
  background-color: var(--primary)
  color: white
  border-radius: 10px
  font-size: 24px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  transition: background-color 0.3s ease

.theme-toggle-btn:hover
  background-color: var(--border)

.tooltip
  position: absolute
  bottom: 60px
  left: 50%
  transform: translateX(-50%)
  background-color: rgba(0, 0, 0, 0.7)
  color: white
  padding: 5px 10px
  border-radius: 5px
  font-size: 12px
  opacity: 0
  pointer-events: none
  transition: opacity 0.3s ease

.theme-toggle-btn:hover .tooltip
  opacity: 1
</style>
