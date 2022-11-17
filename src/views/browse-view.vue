<template>
  <div class="browse">
    <header-browse />
    <section class="browse__content">
      <movies-main />
      <section class="browse__categories categories">
        <ul class="categories__list">
          <li
            class="categories__item"
            v-for="(genre, index) in genres"
            :key="index"
          >
            <movies-main-section :title="genre.name" :id="genre.genre_id" />
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
    methods: {
      ...mapActions(useAppStore, ["getAllGenres"]),
    },
    async created() {
      const response = await this.getAllGenres();
      this.genres = response;
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
