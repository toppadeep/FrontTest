<script setup lang="ts">
import { ref, onMounted } from "vue";

import ItemViewer from "./components/ItemViewer.vue";
import InventoryWrapper from "./components/InventoryWrapper.vue";
import SkeletonLoader from "./components/SkeletonLoader.vue";

const theme = ref<string>(localStorage.getItem("theme") || "dark");

const toggleTheme = (): void => {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
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
    background: variables.$dark-primary
    img
      position: absolute
      top: 8px
      right: 8px
      cursor: pointer
</style>
