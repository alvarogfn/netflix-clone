<template>
  <div class="browse">
    <header-browse />
    <section class="browse__content">
      <movies-main />
      <section class="browse__categories categories">
        <ul class="categories__list">
          <li class="categories__item" v-for="genre in genres" :key="genre">
            <movies-main-section
              :title="genre.name"
              :movies="filterMoviesByGenre(genre.genre_id)"
            />
          </li>
        </ul>
      </section>
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
      ...mapActions(useAppStore, ["getAllMovies", "getAllGenres"]),
      filterMoviesByGenre(genre) {
        return this.movies.filter((movie) => {
          return movie.genres.includes(genre);
        });
      },
    },
    async created() {
      this.genres = await this.getAllGenres();
      this.movies = await this.getAllMovies();
    },
  };
</script>

<style lang="scss" scoped>
  .browse {
    display: flex;
    flex-flow: column nowrap;

    &__content {
      padding-top: 60px;
    }

    &__categories {
      padding-left: 15px;
    }
  }

  .categories {
    &__list {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 30px;
    }
  }
</style>
