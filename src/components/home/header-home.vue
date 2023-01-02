<template>
  <header class="header">
    <router-link
      data-testid="toHome"
      v-if="route.path !== '/'"
      :to="{ name: 'home' }"
    >
      <icon-app-logo class="header__logo" />
    </router-link>
    <icon-app-logo v-else class="header__logo" />
    <router-link
      data-testid="toLogin"
      class="header__link"
      :to="{ name: 'login' }"
    >
      Sign in
    </router-link>
  </header>
</template>

<script lang="ts" setup>
  import IconAppLogo from "@/components/icons/icon-app-logo.vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
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
    }
  }

  @media screen and (min-width: 950px) {
    .header {
      &__logo {
        width: 130px;
      }
    }
  }
</style>
