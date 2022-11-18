<template>
  <div class="browse">
    <header-browse class="browse__header" />
    <section class="browse__content">
      <movies-main />
      <template v-for="genre in genres" :key="genre.genre_id">
        <movies-main-section
          class="browse__categories"
          :title="genre.name"
          :movies="sortMoviesByViews(filterMoviesByGenre(genre.genre_id))"
          v-if="filterMoviesByGenre(genre.genre_id).length > 0"
        />
      </template>
    </section>
  </div>
</template>

<script>
  import { mapActions } from "pinia";
  import HeaderBrowse from "../components/header/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import MoviesMain from "../components/movies/movies-main.vue";
  import { useAppStore } from "../stores/app";

  export default {
    components: { HeaderBrowse, MoviesMainSection, MoviesMain },
    data: () => ({
      genres: [],
      movies: [],
    }),
    methods: {
      ...mapActions(useAppStore, [
        "getAllMovies",
        "getAllGenresByUserRelevance",
      ]),
      filterMoviesByGenre(genre) {
        return this.movies.filter((movie) => {
          return movie.genres.includes(genre);
        });
      },
      sortMoviesByViews(movies) {
        return movies.sort((a, b) => a.views - b.views).reverse();
      },
    },
    async created() {
      this.genres = await this.getAllGenresByUserRelevance();
      this.movies = await this.getAllMovies();
    },
  };
</script>

<style lang="scss" scoped>
  .browse {
    display: flex;
    flex-flow: column nowrap;

    padding-left: 15px;

    &__header {
      padding-left: 15px;
    }

    &__content {
      padding-top: 60px;
    }

    &__header {
      position: fixed;
      left: 0;
    }
  }

  @media screen and (min-width: 885px) {
    .browse {
      padding-left: calc(15px + 2.5vw);

      &__header {
        padding-left: calc(15px + 2.5vw);
      }
    }
  }
</style>
