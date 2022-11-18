<template>
  <header
    class="header"
    :class="{ 'header--black': isMenuOpen }"
    v-if="!is885px"
  >
    <button class="header__menu-button" @click="isMenuOpen = !isMenuOpen">
      <img class="header__menu-icon" src="../../assets/hamburger.gif" />
    </button>
    <router-link class="header__link" :to="{ name: 'browse' }">
      <app-logo-icon class="header__logo" />
    </router-link>

    <movies-lateral-menu v-show="isMenuOpen" class="header__menu" />
  </header>
  <header class="header header--match885px" v-else>
    <router-link
      class="header__link header__link--match885px"
      :to="{ name: 'browse' }"
    >
      <app-logo-icon class="header__logo header__logo--match885px" />
    </router-link>
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item">
          <router-link class="header__page-link" :to="{ name: 'browse' }">
            Inicio
          </router-link>
        </li>
        <li class="header__item">
          <router-link class="header__page-link" :to="{ name: 'metrics' }">
            Bombando
          </router-link>
        </li>
      </ul>
    </nav>
    <section class="header__profile">
      <router-link class="header__profile-link" :to="{ name: 'profile' }">
        <img class="header__profile-img" :src="pictureHref" />
      </router-link>
    </section>
  </header>
</template>

<script>
  import { mapState } from "pinia";
  import { useLoginStore } from "../../stores/login";
  import AppLogoIcon from "../icons/app-logo-icon.vue";
  import MoviesLateralMenu from "./header-lateral-menu.vue";

  export default {
    components: {
      MoviesLateralMenu,
      AppLogoIcon,
    },
    data: () => ({
      isMenuOpen: false,
      is885px: false,
    }),
    computed: {
      ...mapState(useLoginStore, ["pictureHref"]),
    },
    created() {
      const width = window.matchMedia("screen and (min-width: 885px)");
      this.is885px = width.matches;
      width.onchange = (media) => {
        this.is885px = media.matches;
      };
    },
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

    column-gap: 20px;

    height: 60px;

    background-color: #00000099;

    &--match885px {
      height: calc(2vw + 45px);
      min-width: 45px;

      background-color: transparent;

      justify-content: flex-start;

      background-image: linear-gradient(0deg, #00000050 30%, #000000dd 99%);
    }

    &__link {
      display: block;
      width: 80px;

      margin-right: 30px;
    }

    &--black {
      background-color: #000;
    }

    &__logo {
      fill: $red;
      width: 90px;

      &--match885px {
        width: 80px;
      }
    }

    &__menu-button {
      order: 0;
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

    &__nav {
      margin-inline: 10px;

      font-size: 1.1vw;
      font-weight: 500;
    }

    &__list {
      display: flex;
      flex-flow: row nowrap;
      column-gap: 20px;
    }

    &__page-link {
      color: #c3c3c3;

      &:hover {
        color: #fff;
      }
    }

    .router-link-exact-active {
      color: #fff;
    }

    &__profile {
      flex-grow: 1;
      display: flex;

      justify-content: flex-end;
      align-items: center;

      padding-inline: 30px;
    }

    &__profile-link {
      width: 30px;
      height: 30px;
    }

    &__profile-img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
  }
</style>
