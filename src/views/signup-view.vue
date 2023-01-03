<template>
  <div class="home">
    <div class="home__signup">
      <header-home class="home__header" />
      <main class="home__details">
        <h1 class="home__title">Plans for every budget.</h1>
        <p class="home__subtitle">Get Basic with ads for just BRL18.90.</p>
        <router-link :to="{ name: 'signup' }" class="home__register">
          Get Started
        </router-link>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderHome from "../components/home/header-home.vue";
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;
  @use "../styles/components.scss" as *;

  .home {
    display: flex;
    flex-flow: column nowrap;

    margin: 0 auto;

    min-height: 100vh;

    color: #fff;

    background-color: black;

    &__signup {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 70px;

      padding: 22px;

      background-color: #000;
      background-image: linear-gradient(
          0deg,
          #000000dd 0%,
          #00000050 50%,
          #00000050 50%,
          #00000050 90%,
          #000000dd 99%
        ),
        url("../assets/home-background.jpg");
      background-repeat: no-repeat, no-repeat;
      background-size: cover, cover;

      background-position: right center, center center;

      border-bottom: 7px solid #292929;

      min-height: 550px;
    }

    &__details {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      row-gap: 25px;
    }

    &__title {
      font-weight: 900;
      font-size: 3.125rem;
      margin: 0;
    }

    &__subtitle {
      font-size: 1.625rem;
    }

    &__register {
      @include button($padding: 10px 30px 10px 15px);
      background-image: url("../assets/arrow-right.svg");
      background-repeat: no-repeat;
      background-position: 90% center;
      background-size: 15px 15px;
      max-width: 150px;
    }
  }

  @media screen and (min-width: 550px) {
    .home {
      &__signup {
        padding: 25px 45px;
        row-gap: 100px;
      }
    }
  }

  @media screen and (min-width: 950px) {
    .home {
      &__signup {
        padding: 30px 60px;

        padding-bottom: 200px;
      }
    }
  }
</style>
