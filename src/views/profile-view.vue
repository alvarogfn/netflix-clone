<template>
  <div>
    <header-browse></header-browse>
    <main>
      <p>{{ name }}</p>
      <p>{{ email }}</p>
      <img :src="pictureHref" alt="Profile Picture" />
      <section>
        <movies-main-section
          title="Ultimos filmes vistos"
          :movies="
            [
              { thumb: pictureHref },
              { thumb: pictureHref },
              { thumb: pictureHref },
              { thumb: pictureHref },
              { thumb: pictureHref },
            ].slice(0, 5)
          "
        />
      </section>
    </main>
  </div>
</template>

<script>
  import HeaderBrowse from "../components/header/header-browse.vue";
  import { mapState } from "pinia";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import { useLoginStore } from "../stores/login";

  export default {
    data: () => ({}),
    computed: {
      ...mapState(useLoginStore, ["name", "pictureHref", "email", "history"]),
    },
    components: { MoviesMainSection, HeaderBrowse },
    created() {
      console.log(this.pictureHref);
    },
  };
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;

  div {
    height: 100vh;
    max-height: 100%;
    background-color: #141414;
  }

  main {
    display: grid;
    grid-template-areas:
      "a"
      "b"
      "c"
      "d";

    padding: 80px 10px;

    gap: 20px;
  }

  img {
    align-self: center;
    justify-self: center;

    grid-area: a;

    max-width: 200px;

    box-shadow: 5px 5px 5px #0005;
  }

  p {
    &:nth-child(1) {
      grid-area: b;
    }

    &:nth-child(2) {
      grid-area: c;
    }

    color: #fff;
    font-weight: 600;
    text-transform: capitalize;
  }

  section {
    grid-area: d;
  }
</style>
