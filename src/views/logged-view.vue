<template>
  <div class="logged">
    <router-view></router-view>
  </div>
</template>

<script>
  import { useLoginStore } from "../stores/login";

  export default {
    beforeRouteEnter(to, from, next) {
      const store = useLoginStore();
      if (store.islogged) return next();

      next({ name: "home" });
    },
  };
</script>

<style lang="scss" scoped>
  .logged {
    background-color: #141414;
    min-height: 100vh;
  }
</style>
