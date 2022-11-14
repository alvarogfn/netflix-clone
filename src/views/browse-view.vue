<template>
  <div class="container">
    <movies-header />
    <movies-main />
    <section class="container__categories categories">
      <ul class="categories__list">
        <li
          class="categories__item"
          v-for="(section, index) in movieSections"
          :key="index"
        >
          <movies-main-section
            :title="section.title"
            :movies="section.movies"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import MoviesHeader from "../components/movies/movies-header.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import MoviesMain from "../components/movies/movies-main.vue";

  export default {
    components: { MoviesHeader, MoviesMainSection, MoviesMain },
    data: () => ({
      mainMovie: {},
      movieSections: [
        {
          title: "Programas para toda familia",
          movies: [
            {
              thumb:
                "https://occ-0-999-2567.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQ94zuZk-nr5fUE0hX0b1QTxRqftRmYdV97decHANZkQNK8MmOuVGLpgxGJvy_RMfl4UBvigYJnUluud1n5dE--qdMrMlmwF43fG8WkYSSIHkU8ORSuYInVb.jpg?r=480",
            },
            {
              thumb:
                "https://occ-0-999-2567.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQ94zuZk-nr5fUE0hX0b1QTxRqftRmYdV97decHANZkQNK8MmOuVGLpgxGJvy_RMfl4UBvigYJnUluud1n5dE--qdMrMlmwF43fG8WkYSSIHkU8ORSuYInVb.jpg?r=480",
            },
            {
              thumb:
                "https://occ-0-999-2567.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQ94zuZk-nr5fUE0hX0b1QTxRqftRmYdV97decHANZkQNK8MmOuVGLpgxGJvy_RMfl4UBvigYJnUluud1n5dE--qdMrMlmwF43fG8WkYSSIHkU8ORSuYInVb.jpg?r=480",
            },
            {
              thumb:
                "https://occ-0-999-2567.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQ94zuZk-nr5fUE0hX0b1QTxRqftRmYdV97decHANZkQNK8MmOuVGLpgxGJvy_RMfl4UBvigYJnUluud1n5dE--qdMrMlmwF43fG8WkYSSIHkU8ORSuYInVb.jpg?r=480",
            },
          ],
        },
        {
          title: "Novidades das series a que voce ja assistiu",
          movies: [
            {
              thumb:
                "https://occ-0-999-2567.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQ94zuZk-nr5fUE0hX0b1QTxRqftRmYdV97decHANZkQNK8MmOuVGLpgxGJvy_RMfl4UBvigYJnUluud1n5dE--qdMrMlmwF43fG8WkYSSIHkU8ORSuYInVb.jpg?r=480",
            },
            {
              thumb:
                "https://occ-0-999-2567.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQ94zuZk-nr5fUE0hX0b1QTxRqftRmYdV97decHANZkQNK8MmOuVGLpgxGJvy_RMfl4UBvigYJnUluud1n5dE--qdMrMlmwF43fG8WkYSSIHkU8ORSuYInVb.jpg?r=480",
            },
          ],
        },
      ],
    }),
  };
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-flow: column nowrap;
    background-color: #141414;
    min-height: 100vh;
    max-height: 100%;

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

    &__item {
    }
  }
</style>
