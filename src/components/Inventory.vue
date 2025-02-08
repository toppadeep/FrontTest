<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useInventoryStore } from "../store/inventoryStore";

const inventoryStore = useInventoryStore();
const draggedIndex = ref<number | null>(null);

onMounted(() => {
  inventoryStore.initialize();
});

watch(
  () => inventoryStore.items,
  (newItems) => {

  },
  { deep: true },
);

const onDragStart = (event: DragEvent, index: number) => {
  draggedIndex.value = index;
  event.dataTransfer?.setData("text/plain", index.toString());
};

const onDrop = (event: DragEvent, targetIndex: number) => {
  const sourceIndex = draggedIndex.value;
  if (sourceIndex === null || sourceIndex === targetIndex) return;

  inventoryStore.swapItems(sourceIndex, targetIndex);
  draggedIndex.value = null;
};

const emit = defineEmits<{
  (e: "send-data", type: string, data: unknown): void;
}>();

const sendData = (type: string, data: unknown) => {
  emit("send-data", type, data);
};
</script>

<template>
  <div v-for="(item, index) in inventoryStore.items" :key="item.id" draggable="true"
    @dragstart="onDragStart($event, index)" @dragover.prevent @drop="onDrop($event, index)" class="inventory__item"
    @click="
      sendData('object', {
        id: item.id,
        image: item.image,
        amount: item.amount,
        active: true,
      })
      ">
    <img v-if="item.amount != 0" :src="item.image" alt="Empty" />
    <transition name="count">
      <p :key="item.amount" class="amount__items">{{ item.amount }}</p>
    </transition>
  </div>
</template>

<style lang="sass" scoped>

@use "../styles/mixins.scss" as mixins
@use "../styles/variables.scss" as variables

.inventory__item
    width: 105px
    height: 100px
    cursor: pointer
    @include mixins.center()
    border-right: 1px solid var(--border)
    border-bottom: 1px solid var(--border)
    position: relative
    border-radius: 0
    background: var(--primary)
    .amount__items
        @include mixins.center()
        border: 2px solid var(--border)
        border-right: 0
        border-bottom: 0
        color: var(--border)
        font-weight: 700
        border-top-left-radius: 10px
        padding: 5px
        position: absolute
        bottom: 0
        right: 0
        font-size: 10px
.inventory__item:nth-child(1)
        border-top-left-radius: 12px
.inventory__item:nth-child(5)
        border-top-right-radius: 12px
.inventory__item:nth-child(21)
        border-bottom-left-radius: 12px
.inventory__item:nth-child(25)
        border-bottom-right-radius: 12px

.count-enter-active, .count-leave-active
  transition: opacity 1s ease-in-out

.count-enter-from, .count-leave-to
  opacity: 0
</style>
