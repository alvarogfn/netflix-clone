<template>
  <header class="header">
    <router-link class="header__link" :to="{ name: 'home' }">
      <icon-app-logo class="header__icon" />
    </router-link>
  </header>
</template>

<script lang="ts" setup>
  import IconAppLogo from "@/components/icons/icon-app-logo.vue";
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
