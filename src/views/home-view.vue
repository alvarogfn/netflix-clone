<template>
  <div class="container">
    <home-header></home-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from "../components/header/header-home.vue";

  export default { components: { HomeHeader } };
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-flow: column nowrap;

    margin: 0 auto;

    min-height: 100vh;
    background-color: #000;

    background-image: url("../assets/home-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: 100% 300px;

    color: #fff;
  }
</style>
