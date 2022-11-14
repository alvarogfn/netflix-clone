<template>
  <header class="header">
    <router-link v-if="$route.path !== '/'" :to="{ name: 'home' }">
      <app-logo-icon class="header__logo" />
    </router-link>
    <app-logo-icon v-else class="header__logo" />
    <router-link class="header__link" :to="{ name: 'login' }">
      entrar
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
    justify-content: space-between;

    &__logo {
      fill: $red;
      width: 180px;
    }

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column wrap;

      padding: 0px 20px;

      background-color: $red;
      color: #fff;

      font-weight: 500;
      text-transform: capitalize;

      border-radius: 5px;
    }
  }
</style>
