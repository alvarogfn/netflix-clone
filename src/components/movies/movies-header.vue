<template>
  <header class="header" :class="{ 'header--black': isMenuOpen }">
    <app-logo-icon class="header__logo" />
    <button @click="IsMenuOpen = !IsMenuOpen">
      <img class="header__menu-icon" src="../../assets/hamburger.gif" />
    </button>
    <movies-lateral-menu v-show="IsMenuOpen" class="header__menu" />
  </header>
</template>

<script>
  import AppLogoIcon from "../icons/app-logo-icon.vue";
  import MoviesLateralMenu from "./movies-lateral-menu.vue";

  export default {
    components: {
      AppLogoIcon,
      MoviesLateralMenu,
    },
    data: () => ({
      IsMenuOpen: false,
    }),
  };
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .header {
    width: 100vw;
    max-width: 100%;

    position: fixed;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    height: 60px;

    padding: 0 15px;

    background-color: #00000099;
    // background: linear-gradient(0, rgba(0, 0, 0, 0.7) 10%, transparent);

    &--black {
      background-color: #000;
    }

    &__logo {
      order: 2;
      margin: 20px;
      fill: $red;
      width: 90px;
    }

    &__menu-icon {
      width: 25px;
      height: 25px;
    }

    &__menu {
      position: absolute;
      top: 60px;
      left: 0;
    }
  }
</style>
