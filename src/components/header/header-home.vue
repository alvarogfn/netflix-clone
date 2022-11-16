<template>
  <header class="header">
    <router-link v-if="$route.path !== '/'" :to="{ name: 'home' }">
      <app-logo-icon class="header__logo" />
    </router-link>
    <app-logo-icon v-else class="header__logo" />
    <router-link class="header__link" :to="{ name: 'login' }">
      Sign in
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

    padding-top: 50px;
    padding-inline: 20px;

    width: 100vw;

    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 1) 60%
    );
    &__logo {
      fill: $red;
      width: 90px;
    }

    &__link {
      width: 65px;
      height: 30px;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column wrap;

      background-color: $red;
      color: #fff;

      font-weight: 400;
      text-transform: capitalize;

      border-radius: 5px;
    }
  }
</style>
