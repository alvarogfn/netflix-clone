<template>
  <div class="metrics">
    <header-browse class="metrics__header"></header-browse>
    <main class="metrics__content">
      <metrics-top-watchers-list :users="users" />
      <movies-main-section
        title="Top Movies Watch in EUA"
        :movies="topMovies"
      />
      <template v-for="genre in genres" :key="genre.id">
        <movies-main-section
          :title="'Most viewed titles in ' + genre.name"
          :movies="getMostViewedMoviesByGenre(genre.id!)"
          v-if="getMostViewedMoviesByGenre(genre.id!).length > 0"
        />
      </template>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import HeaderBrowse from "../components/header/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import MetricsTopWatchersList from "../components/metrics/metrics-top-watchers-list.vue";
  import { useAppStore } from "../stores/app";
  import { onMounted, ref } from "vue";
  import type { Genre, Movie, User } from "@/db";
  const appStore = useAppStore();

  const users = ref<{ user: User; movies: Movie[] }[]>([]);
  const topMovies = ref<Movie[]>([]);
  const genres = ref<Genre[]>([]);
  const movies = ref<Movie[]>([]);

  function sortByViews(movies: Movie[]) {
    return movies.sort((a, b) => a.views - b.views).reverse();
  }

  function getMostViewedMoviesByGenre(genre_id: number) {
    return sortByViews(
      movies.value.filter((movie) => movie.genres.includes(genre_id))
    );
  }

  onMounted(async () => {
    topMovies.value = await appStore.getMostViewedMovies();
    users.value = await appStore.topMovieWatchers();
    genres.value = await appStore.getMostViewedGenres();
    movies.value = await appStore.getAllMovies();
  });
</script>

<style lang="scss" scoped>
  .metrics {
    min-height: 100vh;

    &__header,
    &__content {
      padding-left: 15px;
    }

    &__header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    &__content {
      padding-top: 60px;
    }
  }

  @media screen and (min-width: 885px) {
    .metrics {
      &__header,
      &__content {
        padding-left: calc(15px + 2.5vw);
      }
    }
  }
</style>
