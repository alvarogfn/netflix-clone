<template>
  <header class="header">
    <router-link class="header__home" :to="{ name: 'home' }">
      <icon-app-logo class="header__icon" />
    </router-link>
    <router-link class="header__login" :to="{ name: 'login' }">
      Sign In
    </router-link>
  </header>
</template>

<script lang="ts" setup>
  import IconAppLogo from "@/components/icons/icon-app-logo.vue";
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    padding: calc(5px + 1vw);

    border-bottom: 1px solid #7777;

    &__home {
      display: flex;
      align-items: center;
      justify-content: center;

      width: calc(30px + 12.5vw);
    }

    &__login {
      align-self: center;
      padding: 10px;

      font-weight: 600;
      color: #222;

      &:hover {
        text-decoration: underline;
      }
    }

    &__icon {
      fill: $red;
      max-width: 100%;
    }
  }
</style>
