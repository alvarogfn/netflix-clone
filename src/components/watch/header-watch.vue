<template>
  <header class="header">
    <button @click="back" class="header__button">
      <go-back-icon class="header__icon" />
    </button>
  </header>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import GoBackIcon from "../icons/icon-go-back.vue";

  const router = useRouter();

  function back() {
    if (history.state.back === null) return router.push({ name: "browse" });
    router.back();
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    padding-inline: 10px;

    width: 100vw;

    background-color: #000;

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;
      width: 40px;
    }

    &__logo {
      width: 100%;
      height: 100%;
      fill: #fff;
    }
  }
</style>
