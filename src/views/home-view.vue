<template>
  <div class="container">
    <home-header></home-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from "../components/home/home-header.vue";

  export default { components: { HomeHeader } };
</script>

<style lang="scss" scoped>
  .container {
    padding: 40px 80px;
    background-image: url("../assets/home-background.jpg");
    background-size: cover;
    background-attachment: fixed;

    color: #fff;
  }
</style>
