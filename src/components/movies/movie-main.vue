<template>
  <article class="container">
    <section class="container__details">
      <h1 class="container__title">Boku no Hero Academia</h1>
      <p class="container__paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate qui
        sequi sunt tempore laboriosam sed vitae.
      </p>

      <router-link to="" class="container__link">Assistir</router-link>
    </section>
    <video class="container__video" autoplay muted>
      <source src="@/assets/promotional.mp4" />
    </video>
    <div class="container__gradient"></div>
  </article>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .container {
    position: relative;
    &__video {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }

    &__details {
      display: flex;

      flex-flow: column nowrap;
      row-gap: 10px;

      position: absolute;

      bottom: 100px;
      left: 50px;

      max-width: calc(300px + 10vw);

      color: #fff;
    }

    &__title {
      text-shadow: 1px 1px 1px black;
      font-size: 1.2rem;
    }

    &__paragraph {
      text-shadow: 1px 1px 1px black;
      line-height: 1.5rem;
    }

    &__link {
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: #fff;
      color: black;

      border-radius: 5px;

      font-weight: 600;
      height: 40px;
      width: 100px;

      cursor: pointer;

      &:hover {
        filter: brightness(80%);
      }
    }

    &__gradient {
      position: absolute;
      background-image: linear-gradient(180deg, transparent 20%, #141414 90%);
      height: 200px;
      bottom: 0;

      left: 0;
      right: 0;
    }
  }
</style>
