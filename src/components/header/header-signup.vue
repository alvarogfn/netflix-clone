<template>
  <header class="header">
    <app-logo-icon class="header__icon" />
    <router-link class="header__login" :to="{ name: 'login' }">
      Entrar
    </router-link>
  </header>
</template>

<script>
  import AppLogoIcon from "../icons/app-logo-icon.vue";

  export default { components: { AppLogoIcon } };
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding: 20px;

    border-bottom: 1px solid #7777;

    &__login {
      font-weight: 500;
      color: #222;
    }

    &__icon {
      fill: $red;
      max-width: 100px;
    }
  }
</style>
