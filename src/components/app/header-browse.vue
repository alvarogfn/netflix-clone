<template>
  <header
    class="header"
    :class="{
      'header--black': menuOpen,
    }"
    v-if="!desktop"
    ref="header"
  >
    <button class="header__menu-button" @click="menuOpen = !menuOpen">
      <icon-menu class="header__menu-icon" />
    </button>
    <router-link class="header__link" :to="{ name: 'browse' }">
      <app-logo-icon class="header__logo" />
    </router-link>
    <appear-from from="right">
      <movies-lateral-menu v-if="menuOpen" class="header__menu" />
    </appear-from>
  </header>
  <header
    class="header header--match885px"
    :class="{
      'header--transparent': !scrolled,
    }"
    v-else
  >
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
        <img class="header__profile-img" :src="picture" />
      </router-link>
    </section>
  </header>
</template>

<script setup lang="ts">
  import { useBlobURL } from "@/composables/useBlobURL";
  import { useMatchMedia } from "@/composables/useMatchMedia";
  import { ref, onMounted, onUnmounted } from "vue";
  import { useLoginStore } from "../../stores/login";
  import AppLogoIcon from "../icons/app-logo-icon.vue";
  import IconMenu from "../icons/icon-menu.vue";
  import AppearFrom from "../shared/transitions/appear-from.vue";
  import MoviesLateralMenu from "./header-lateral-menu.vue";
  const loginStore = useLoginStore();

  const menuOpen = ref<boolean>(false);
  const desktop = useMatchMedia("screen and (min-width: 885px)");
  const picture = useBlobURL(loginStore.picture!);

  const scrolled = ref<boolean>(true);

  function isScrolled() {
    scrolled.value = window.scrollY > 10;
  }

  onMounted(() => {
    window.addEventListener("scroll", isScrolled);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", isScrolled);
  });
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .header {
    z-index: 2;
    width: 100vw;
    max-width: 100%;

    position: fixed;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    column-gap: 20px;

    height: 60px;

    background-color: #00000099;

    transition: 200ms;

    &--black {
      background-color: #000;
    }

    &--transparent {
      background-color: transparent;
    }

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

    &__logo {
      fill: $red;
      width: 90px;

      &--match885px {
        width: 80px;
      }
    }

    &__menu-button {
      order: 0;
      background-color: transparent;
    }

    &__menu-icon {
      width: 25px;
      height: 25px;

      fill: #ffffff;
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
