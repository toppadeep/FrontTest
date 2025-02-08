<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useInventoryStore } from "../store/inventoryStore";
import PropertiesOfItemGroup from "./PropertiesOfItemGroup.vue";

const inventoryStore = useInventoryStore();
onMounted(() => {
  inventoryStore.initialize();
});

const changeQuantity = (itemId: number, newQuantity: number) => {
  inventoryStore.updateItemQuantity(itemId, newQuantity);
  sendMessage();
};

const isRequestForm = ref<boolean>(false);

const request = ref<boolean>(false);
const props = defineProps<{
  id: number;
  active: boolean;
  image: string;
  amount: number;
}>();

const newQuantity = ref<number>(props.amount);

const ShowDeleteForm = () => {
  isRequestForm.value = !isRequestForm.value;
};

const emit = defineEmits<{
  (e: "request", message: boolean): void;
}>();

const sendMessage = () => {
  emit("request", false);
};
</script>

<template>
  <div
    v-if="props.active"
    :key="props.id"
    class="wrapper__modal"
    :class="{ visible: props.active }"
  >
    <button class="button_close_modal" @click="sendMessage">
      <img src="../assets/carbon_close.png" alt="Close" />
    </button>
    <div v-if="props.amount != 0" class="modal">
      <img class="invent" :src="props.image" alt="Invent" />
      <hr />
      <div class="item__decsription">
        <PropertiesOfItemGroup :amount="5" />
      </div>
      <hr />
      <button class="button" @click="ShowDeleteForm">Удалить предмет</button>
      <Transition name="slide-fade">
        <form v-if="isRequestForm" @submit.prevent="" action="">
          <input
            v-if="!request"
            type="number"
            placeholder="Введите количество"
            @click="request = !request"
          />
          <input
            v-else
            type="number"
            :max="props.amount"
            v-model="newQuantity"
          />
          <div class="wrapper__buttons__action">
            <button class="button__action--cancel" @click="ShowDeleteForm">
              Отмена
            </button>
            <button
              class="button__action--confirm"
              @click="changeQuantity(props.id, newQuantity)"
            >
              Подтвердить
            </button>
          </div>
        </form>
      </Transition>
    </div>
    <div v-else class="">
      <h1>Пусто</h1>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '../styles/mixins.scss' as mixins
@use '../styles/variables.scss' as variables
.wrapper__modal
    @include mixins.center()
    @include mixins.border()
    flex-flow: column nowrap
    padding: 1em
    backdrop-filter: blur(16px)
    border-top-left-radius: 0
    border-bottom-left-radius: 0
    background: var(--transparent)
    position: absolute
    right: 0px
    width: 250px
    height: 500px
    transition: right 0.5s ease-in-out
    transition: opacity 0.4s ease-in-out
    .button_close_modal
        position: absolute
        top:8px
        right: 8px
        background: none
        border: none
        cursor: pointer
        z-index: 999
    .button_close_modal:hover
        background: var(--loader)
    .button_close_modal:active
        background: var(--skeleton)
    .item__decsription
        height: 40%
    .invent
        padding-top: 2em
        margin-bottom: 1em
        width: 50%
    form
      @include mixins.center()
      position: absolute
      justify-content: space-around
      flex-flow: column nowrap
      padding: 1em
      border-top: 1px solid var(--border)
      bottom: 0
      width: 100%
      height: 133px
      background: var(--primary)
      input
        width: 100%
        font-size: 14px
        font-weight: 500
        background: var(--bg)
        color: var(--text)
    .wrapper__buttons__action
        @include mixins.center()
        width: 100%
        flex-flow: row nowrap
        .button__action--cancel
            @include mixins.button__preset()
            background: var(--accent)
            color: var(--text)
            margin-right: 1em
            height: 33px
        .button__action--confirm
            @include mixins.button__preset()
            background: var(--button)
            color: var(--text)
            height: 33px

.modal
    @extend .wrapper__modal
.button
    @include mixins.button__preset()

.slide-fade-enter-active,
.slide-fade-leave-active
  transition: transform 0.6s ease-out, opacity 0.6s ease-out

.slide-fade-enter-from
  transform: translateY(100%)
  opacity: 0

.slide-fade-enter-to
  transform: translateY(0)
  opacity: 1

.slide-fade-leave-from
  transform: translateY(0)
  opacity: 1

.slide-fade-leave-to
  transform: translateY(100%)
  opacity: 0
</style>
