<template>
  <div v-if="movie">
    <header-watch />
    <main>
      <iframe
        v-if="iframe"
        width="560"
        height="315"
        :src="iframe"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <img v-else :src="movie.backdrop" />
      <section>
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.year }}</p>
        <p>{{ movie.us_rating }}</p>
        <p>{{ movie.sources?.[0].format }}</p>
        <p>{{ movie.sources?.[0].seasons }}</p>
        <p>{{ movie.plot_overview }}</p>
      </section>
    </main>
  </div>
</template>

<script>
  import { mapActions, mapState } from "pinia";
  import HeaderWatch from "../components/header/header-watch.vue";
  import { useAppStore } from "../stores/app";
  import { useLoginStore } from "../stores/login";

  export default {
    components: { HeaderWatch },
    data: () => ({
      movie: undefined,
    }),
    computed: {
      ...mapState(useLoginStore, ["id"]),
      iframe() {
        if (this.movie.trailer) {
          const regExp =
            /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = this.movie.trailer.match(regExp);
          return `https://www.youtube.com/embed/${match[2]}`;
        } else return undefined;
      },
    },
    methods: {
      ...mapActions(useAppStore, ["getMovieById", "addToHistory"]),
    },
    async created() {
      const id = this.$route.params.id;

      if (!id) return;

      this.addToHistory({ user_id: this.id, movie_id: id });

      this.movie = await this.getMovieById(id);
    },
  };
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-flow: column nowrap;

    min-height: 100vh;

    background-color: #000;
  }

  header {
    height: 50px;

    position: fixed;
  }

  main {
    color: #fff;
  }

  iframe {
    width: 100%;
    height: 300px;
    background-color: #000;
    border: none;
  }

  section {
    padding: 0 10px;
  }

  h1 {
    margin-top: 10px;
    font-size: 1.3rem;
  }
</style>
