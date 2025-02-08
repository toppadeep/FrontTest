<script setup lang="ts">
import { ref } from "vue";
import InnerModal from "../components/InnerModal.vue";
import Inventory from "./Inventory.vue";

const dataType = ref("");
const active = ref<boolean>(false);
const image = ref<string>("");
const amount = ref<number>(0);
const id = ref<number>(0);

const handleData = (type: string, payload: unknown) => {
  dataType.value = type;
  active.value = payload.active;
  image.value = payload.image;
  amount.value = payload.amount;
  id.value = payload.id;
};

const handleMessage = () => {
  active.value = false;
};
</script>

<template>
  <div class="invent-container">
    <Inventory @send-data="handleData" />
    <Transition name="slide-fade">
      <InnerModal
        v-if="active"
        @request="handleMessage"
        :active="active"
        :image="image"
        :amount="amount"
        :id="id"
      />
    </Transition>
  </div>
</template>

<style lang="sass" scoped>

@use "../styles/mixins.scss" as mixins
@use "../styles/variables.scss" as variables

.invent-container
    display: grid
    grid-template-columns: repeat(5, 1fr)
    grid-template-rows: repeat(5, 1fr)
    width: 525px
    height: 500px
    margin: 0 auto
    margin-left: 2em
    background: variables.$dark-primary
    @include mixins.border()

.slide-fade-enter-active,
.slide-fade-leave-active
  transition: transform 0.6s ease-out, opacity 0.6s ease-out

.slide-fade-enter-from
  transform: translateX(100%)
  opacity: 0

.slide-fade-enter-to
  transform: translateX(0)
  opacity: 1

.slide-fade-leave-from
  transform: translateX(0)
  opacity: 1

.slide-fade-leave-to
  transform: translateX(100%)
  opacity: 0
</style>
