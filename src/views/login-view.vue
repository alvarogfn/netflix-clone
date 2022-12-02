<template>
  <div class="login">
    <header-login />
    <main class="login__content">
      <login-form />
    </main>
  </div>
</template>

<script setup lang="ts">
  import HeaderLogin from "../components/header/header-login.vue";
  import LoginForm from "../components/login/login-form.vue";
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;
  .login {
    background-color: #000;
    height: 100vh;

    padding: 20px 10px;

    &__header {
      fill: $red;
    }

    &__icon {
      width: 80px;
    }

    &__content {
      padding: 5px 10px;
    }

    &__title {
      color: #fff;
    }
  }

  @media screen and (min-width: 550px) {
    .login {
      padding: 20px;
      &__header {
        margin-bottom: 10px;
      }
      &__icon {
        width: 190px;
      }
    }
  }

  @media screen and (min-width: 740px) {
    .login {
      &__header {
        margin-bottom: 100px;
      }
      &__icon {
        width: 190px;
      }
    }
  }
</style>
