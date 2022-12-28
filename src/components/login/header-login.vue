<template>
  <header class="header">
    <router-link class="header__link" :to="{ name: 'home' }">
      <app-logo-icon class="header__icon" />
    </router-link>
  </header>
</template>

<script lang="ts" setup>
  import AppLogoIcon from "../icons/app-logo-icon.vue";
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;

  .header {
    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    &__icon {
      fill: $red;
      width: 100%;
    }
  }
</style>
