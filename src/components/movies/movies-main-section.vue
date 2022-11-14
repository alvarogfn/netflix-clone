<template>
  <section class="movie-section">
    <h1 class="movie-section__title">{{ title }}</h1>
    <div class="movie-section__movies">
      <ul class="movie-section__list">
        <li
          class="movie-section__item"
          v-for="movie in movies"
          :key="movie.key"
        >
          <movie-card class="movie-section__movie" :thumb="movie.thumb" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import MovieCard from "./movie-card.vue";

  export default {
    components: { MovieCard },
    props: {
      title: String,
      movies: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .movie-section {
    &__title {
      height: 40px;
      max-width: calc(100vw - 30px);
      color: #999;
      font-size: 1.2rem;
      font-weight: 700;

      display: flex;
      align-items: flex-end;
    }

    &__movies {
      height: 100px;

      overflow: hidden;
    }

    &__list {
      box-sizing: content-box;

      display: flex;
      flex-flow: row nowrap;
      gap: 2.5px;

      margin-bottom: -15px;
      padding-bottom: 15px;

      overflow-x: scroll;
      overflow-y: hidden;

      max-width: calc(100vw - 17px);
    }

    &__item {
      width: 200px;
      min-width: 200px;
      flex-basis: 200px;
    }
  }
</style>
