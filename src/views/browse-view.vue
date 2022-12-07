<template>
  <div class="browse">
    <header-browse class="browse__header" />
    <section class="browse__content">
      <template v-for="genre in genres" :key="genre.id">
        <movies-main-section
          class="browse__categories"
          :title="genre.name"
          :movies="sortMoviesByViews(filterMoviesByGenre(genre.id!))"
          v-if="filterMoviesByGenre(genre.id!).length > 0"
        />
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
  import type { Genre, Movie } from "@/db";
  import { useAppStore } from "@/stores/app";
  import { ref, onMounted } from "vue";
  import HeaderBrowse from "../components/header/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";

  const appStore = useAppStore();

  const genres = ref<Genre[]>([]);
  const movies = ref<Movie[]>([]);

  function filterMoviesByGenre(genre: number) {
    return movies.value.filter((movie) => {
      return movie.genres.includes(genre);
    });
  }

  function sortMoviesByViews(movies: Movie[]) {
    return movies.sort((a, b) => a.views - b.views).reverse();
  }

  onMounted(async () => {
    genres.value = await appStore.getAllGenresByUserRelevance();
    movies.value = await appStore.getAllMovies();
  });
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
