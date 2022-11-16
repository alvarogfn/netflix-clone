<template>
  <router-view></router-view>
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

<style lang="scss" scoped></style>
