<template>
  <div class="metrics">
    <header-browse class="metrics__header"></header-browse>
    <main class="metrics__content">
      <metrics-top-watchers-list :users="users" />
      <movies-main-section
        title="Top Movies Watch in EUA"
        :movies="mostViewedMovies"
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
  import HeaderBrowse from "@/components/shared/header/header-browse.vue";
  import MoviesMainSection from "@/components/shared/movies/movies-main-section.vue";
  import MetricsTopWatchersList from "@/components/metrics/metrics-top-watchers-list.vue";
  import { onMounted, ref } from "vue";
  import { db, type Genre, type Movie, type User } from "@/database/database";
  import { topUsersMetrics } from "@/services/history";
  const users = ref<{ user: User; views: number }[]>([]);

  const mostViewedMovies = ref<Movie[]>([]);

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
    mostViewedMovies.value = await db.movies
      .orderBy("views")
      .reverse()
      .toArray();

    users.value = await topUsersMetrics();
    genres.value = await db.genres.orderBy("views").reverse().toArray();
    movies.value = await db.movies.toArray();
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
