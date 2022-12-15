<template>
  <section class="movie-section">
    <list-horizontal :title="title" list-height="150px">
      <li class="movie-section__item" v-for="movie in movies" :key="movie.id">
        <movie-card
          class="movie-section__card"
          :thumb="movie.backdrop"
          :id="movie.id!"
        />
      </li>
    </list-horizontal>
  </section>
</template>

<script setup lang="ts">
  import type { Movie as MovieProp } from "@/database/database";
  import ListHorizontal from "../utils/list-horizontal.vue";
  import MovieCard from "./movie-card.vue";

  interface Props {
    title: string;
    movies?: MovieProp[];
  }

  withDefaults(defineProps<Props>(), { movies: () => [] });
</script>

<style lang="scss" scoped>
  .movie-section {
    &__item {
      min-width: 200px;
      max-width: 200px;
    }
  }

  @media screen and (min-width: 885px) {
    .movie-section {
      &__item {
        min-width: 250px;
        max-width: 250px;
      }
    }
  }
</style>
