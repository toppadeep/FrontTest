<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  width: number;
  height: number;
  around: number;
}>();

const boxStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  "border-radius": `${props.around}px`,
}));
</script>

<template>
  <div :style="boxStyle" class="skeleton-container"></div>
</template>

<style lang="sass" scoped>

@use "../styles/mixins.scss" as mixin
@use "../styles/variables.scss" as variables

.skeleton-container
    background: linear-gradient(90deg, var(--skeleton) 25%, var(--loader) 50%, var(--skeleton) 75%)
    background-size: 200% 100%
    animation: loading 1.5s infinite

@keyframes loading
  0%
    background-position: 200% 0
  100%
    background-position: -200% 0
</style>
