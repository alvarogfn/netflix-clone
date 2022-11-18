<template>
  <header class="header">
    <router-link class="header__link" :to="{ name: 'home' }">
      <app-logo-icon class="header__icon" />
    </router-link>
  </header>
</template>

<script>
  import AppLogoIcon from "../icons/app-logo-icon.vue";
  export default {
    components: { AppLogoIcon },
  };
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;

  .header {
    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
    }

    &__icon {
      fill: $red;
      width: 80px;
    }
  }

  @media screen and (min-width: 550px) {
    .header {
      margin-bottom: 10px;

      &__link {
        width: 190px;
      }

      &__icon {
        width: 190px;
      }
    }

    @media screen and (min-width: 740px) {
      .header {
        margin-bottom: 100px;
      }
    }
  }
</style>
