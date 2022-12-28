<template>
  <div class="browse">
    <header-browse class="browse__header" />
    <section
      class="browse__content"
      :class="{ 'browse__content--desktop': desktop }"
    >
      <movie-main class="browse__main" v-if="desktop" />
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
  import MovieMain from "@/components/movies/movie-main.vue";
  import { useMatchMedia } from "@/composables/useMatchMedia";
  import { db, type Genre, type Movie } from "@/database/database";
  import { getAllGenresByUserRelevance } from "@/services/relevance";
  import { useLoginStore } from "@/stores/login";
  import { ref, onMounted } from "vue";
  import HeaderBrowse from "../components/app/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";

  const loginStore = useLoginStore();

  const desktop = useMatchMedia("screen and (min-width: 780px)");

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
    genres.value = [];
    genres.value = await getAllGenresByUserRelevance(loginStore.id!);
    movies.value = await db.movies.orderBy("views").toArray();
  });
</script>

<style lang="scss" scoped>
  .browse {
    display: flex;
    flex-flow: column nowrap;

    // padding-left: 15px;

    &__header {
      padding-left: 15px;
    }

    &__content {
      padding-top: 60px;
      &--desktop {
        padding-top: 0px;
      }
    }

    &__categories {
      padding-left: 15px;
    }

    &__header {
      position: fixed;
      left: 0;
    }
  }

  @media screen and (min-width: 885px) {
    .browse {
      &__content {
        margin-top: -100px;
      }
      &__categories {
        padding-left: calc(15px + 2.5vw);
        margin-bottom: 30px;
      }

      &__header {
        padding-left: calc(15px + 2.5vw);
      }
    }
  }
</style>
