<script setup lang="ts">
import { ref } from "vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";

const props = defineProps<{
  amount: number;
}>();

interface SkeletonItem {
  width: number;
  height: number;
  around: number;
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const items = ref<SkeletonItem[]>(
  Array.from({ length: props.amount }, () => ({
    width: getRandomNumber(80, 190),
    height: 10,
    around: 4,
  })),
);
</script>

<template>
  <div class="properties__info">
    <div class="properties__skeleton--primary">
      <SkeletonLoader :width="190" :height="26" :around="8" />
    </div>
    <div class="properties__skeleton--secondary">
      <SkeletonLoader
        v-for="(item, index) in items"
        :key="index"
        :width="item.width"
        :height="item.height"
        :around="item.around"
      />
    </div>
    <div class="properties__skeleton--thirty">
      <SkeletonLoader :width="80" :height="10" :around="4" />
    </div>
  </div>
</template>

<style lang="sass" scoped>

@use "../styles/mixins.scss" as mixin

.properties__info
    @include mixin.fullcorner()
    justify-content: space-between
    padding-top: 1em
    padding-bottom: 1em
    .properties__skeleton--primary
        padding-bottom: 1em
    .properties__skeleton--secondary
        display: flex
        justify-content: space-between
        align-items: center
        flex-direction: column
        height: 50%
    .properties__skeleton--thirty
        padding-top: 1em
</style>
