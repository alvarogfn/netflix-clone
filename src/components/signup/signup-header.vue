<template>
  <header class="header">
    <app-logo-icon class="header__icon" />
  </header>
</template>

<script>
  import AppLogoIcon from "../icons/app-logo-icon.vue";

  export default { components: { AppLogoIcon } };
</script>

<style lang="scss" scoped>
  .header {
    height: 100px;
    padding: 20px;

    border-bottom: 1px solid black;

    &__icon {
      max-width: 140px;
    }
  }
</style>
