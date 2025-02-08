<script setup lang="ts">
import PropertiesOfItemGroup from "./PropertiesOfItemGroup.vue";
</script>

<template>
  <div class="card">
    <div class="card__picture">
      <img src="../assets/Template.png" alt="" />
    </div>
    <PropertiesOfItemGroup :amount="5" />
  </div>
</template>

<style lang="sass" scoped>

@use "../styles/mixins.scss" as mixin
@use "../styles/variables.scss" as variables

.card
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 18px
    height: 500px
    width: 236px
    background: variables.$dark-primary
    @include mixin.border(1px)
</style>
