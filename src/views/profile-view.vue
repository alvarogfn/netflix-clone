<template>
  <div class="profile">
    <header-browse class="profile__header" />
    <main class="profile__content">
      <title-text-label
        class="profile__field profile__field--name"
        title="name"
        :content="name"
      />
      <title-text-label
        class="profile__field profile__field--email"
        title="email"
        :content="email"
      />
      <img class="profile__img" :src="pictureHref" alt="Profile Picture" />
      <section class="profile__history">
        <movies-main-section title="Ultimos filmes vistos" :movies="movies" />
      </section>
    </main>
  </div>
</template>

<script>
  import HeaderBrowse from "../components/header/header-browse.vue";
  import { mapActions, mapState } from "pinia";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import { useLoginStore } from "../stores/login";
  import { useAppStore } from "../stores/app";
  import TitleTextLabel from "../components/utils/title-text-label.vue";

  export default {
    data: () => ({
      movies: [],
    }),
    computed: {
      ...mapState(useLoginStore, [
        "name",
        "pictureHref",
        "email",
        "history",
        "id",
      ]),
    },
    methods: {
      ...mapActions(useAppStore, ["getUserHistory"]),
    },
    components: { MoviesMainSection, HeaderBrowse, TitleTextLabel },
    async created() {
      this.movies = await this.getUserHistory(this.id, 99);
    },
  };
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;

  .profile {
    height: 100vh;
    max-height: 100%;
    background-color: #141414;
    &__content {
      display: grid;
      grid-template-areas:
        "a"
        "b"
        "c"
        "d";

      padding: 80px 10px;

      gap: 20px;
    }

    &__field {
      color: #fff;
      font-weight: 600;
      text-transform: capitalize;

      &--name {
        grid-area: b;
      }

      &--email {
        grid-area: c;
      }
    }

    &__img {
      align-self: center;
      justify-self: center;

      grid-area: a;

      max-width: 200px;

      box-shadow: 5px 5px 5px #0005;
    }

    &__history {
      grid-area: d;
    }
  }

  @media screen and (min-width: 885px) {
    .profile {
      &__content {
        grid-template-areas:
          "a b b"
          "a c c"
          "a . ."
          "d d d";
      }
    }
  }
</style>
