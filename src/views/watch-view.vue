<template>
  <div class="watch" :class="{ 'watch--desktop': !mobile }" v-if="movie">
    <header-watch
      class="watch__header"
      :class="{ 'watch__header--desktop': !mobile }"
    />
    <main class="watch__content">
      <iframe
        class="watch__video"
        :class="{ 'watch__video--desktop': !mobile }"
        v-if="iframe"
        width="560"
        height="315"
        :src="iframe"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <img
        class="watch__video watch__video--thumb"
        :class="{ 'watch__video--desktop': !mobile }"
        v-else
        :src="movie.backdrop"
      />
      <section class="watch__details" v-if="mobile">
        <h1 class="watch__title">{{ movie.title }}</h1>
        <p class="watch__year">{{ movie.year }}</p>
        <p class="watch__rating">{{ movie.rating }}</p>
        <p class="watch__plot">{{ movie.plot }}</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { useMatchMedia } from "@/composables/useMatchMedia";
  import { db, type Movie } from "@/database/database";
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import HeaderWatch from "../components/watch/header-watch.vue";
  import { useLoginStore } from "../stores/login";
  import { addNewUserView } from "@/services/history";

  const loginStore = useLoginStore();

  const route = useRoute();

  const movie = ref<Movie | null>(null);
  const error = ref(false);
  const mobile = useMatchMedia("screen and (max-width: 885px)");

  const iframe = computed(() => {
    if (movie.value?.video) {
      const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = movie.value?.video.match(regExp);
      if (match === null) return "";
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    } else return undefined;
  });

  onMounted(async () => {
    const movie_id = route.params.id as string;

    if (!movie_id) return;

    const loadedMovie = await db.movies.get(parseInt(movie_id));

    if (!loadedMovie) {
      error.value = true;
      return;
    }

    movie.value = loadedMovie;

    addNewUserView(loginStore.id!, parseInt(movie_id));
  });
</script>

<style lang="scss" scoped>
  @use "@/styles/colors.scss" as *;

  .watch {
    display: flex;
    flex-flow: column nowrap;

    min-height: 100vh;

    background-color: #000;

    &:hover {
      .watch__header {
        &--desktop {
          transition: 200ms;
          opacity: 1;
        }
      }
    }

    &__header {
      &--desktop {
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;

        height: 60px;

        opacity: 0;
      }
    }

    &__video {
      width: 100%;
      height: calc(300px + 5vw);
      background-color: #000;
      border: none;

      &--desktop {
        z-index: 1;
        width: 100vw;
        height: 100vh;
        position: fixed;
      }

      &--thumb {
        object-fit: contain;
      }
    }

    &__details {
      padding-inline: 10px;
      font-size: 0.8rem;

      color: #fff;
    }

    &__title {
      margin: 0;
    }

    &__year {
      margin-top: 10px;
      color: rgba(255, 255, 255, 0.5);
      max-width: 20px;
    }

    &__rating {
      margin-top: 2.5px;
      background-color: $orange;
      width: max-content;
    }

    &__plot {
      margin-top: 30px;
    }
  }
</style>
