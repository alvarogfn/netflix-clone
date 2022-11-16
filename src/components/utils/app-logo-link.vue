<template>
  <router-link to="/" class="anchor">
    <app-logo-icon class="anchor__link"></app-logo-icon>
  </router-link>
</template>

<script>
  import AppLogoIcon from "../icons/app-logo-icon.vue";

  export default { components: { AppLogoIcon } };
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .anchor {
    &__link {
      fill: $red;
    }
  }
</style>
