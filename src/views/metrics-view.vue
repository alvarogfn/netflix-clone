<template>
  <div class="metrics">
    <header-browse class="metrics__header"></header-browse>
    <main class="metrics__content">
      <metrics-top-watchers-list :users="users" />
      <movies-main-section
        title="Top Movies Watch in EUA"
        :movies="topMovies"
      />
      <template v-for="genre in genres" :key="genre.genre_id">
        <movies-main-section
          :title="'Most viewed titles in ' + genre.name"
          :movies="getMostViewedMoviesByGenre(genre.genre_id)"
          v-if="getMostViewedMoviesByGenre(genre.genre_id).length > 0"
        />
      </template>
    </main>
  </div>
</template>

<script>
  import { mapActions } from "pinia";
  import HeaderBrowse from "../components/header/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import MetricsTopWatchersList from "../components/metrics/metrics-top-watchers-list.vue";
  import { useAppStore } from "../stores/app";

  export default {
    components: { HeaderBrowse, MoviesMainSection, MetricsTopWatchersList },
    data: () => ({
      users: [],
      topMovies: [],
      genres: [],
      movies: [],
    }),
    methods: {
      ...mapActions(useAppStore, [
        "topMovieWatchers",
        "getAllMovies",
        "getMostViewedMovies",
        "getMostViewedGenres",
      ]),
      sortByViews(arr) {
        return arr.sort((a, b) => a.views - b.views);
      },
      getMostViewedMoviesByGenre(genre) {
        return this.sortByViews(
          this.movies.filter((movie) => movie.genres.includes(genre))
        );
      },
    },
    async created() {
      this.topMovies = await this.getMostViewedMovies();
      this.users = await this.topMovieWatchers();
      this.genres = await this.getMostViewedGenres();
      this.movies = await this.getAllMovies();
    },
  };
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
