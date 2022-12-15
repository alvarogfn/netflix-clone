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

<script lang="ts" setup>
  import AppLogoIcon from "../icons/app-logo-icon.vue";
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  
  @use "../../styles/components.scss" as *;
  .header {
    display: flex;
    justify-content: space-between;

    &__logo {
      fill: $red;
      width: 90px;
    }

    &__link {
      @include button();
    }
  }

  @media screen and (min-width: 550px) {
    .header {
      &__logo {
        width: 110px;
      }

      &__link {
        // width: 85px;
        // height: 35px;
      }
    }
  }

  @media screen and (min-width: 950px) {
    .header {
      &__logo {
        width: 130px;
      }

      &__link {
        // width: 85px;
        // height: 35px;
      }
    }
  }
</style>
