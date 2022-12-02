<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { useLoginStore } from "../stores/login";

  // export default {
  //   beforeRouteEnter(to, from, next) {
  //     const store = useLoginStore();
  //     if (store.isAuth) return next();

  //     next({ name: "home" });
  //   },
  // };
</script>

<style lang="scss" scoped>
  .app {
    background-color: #141414;
    min-height: 100vh;
  }
</style>
