<template>
  <div class="watch" :class="{ 'watch--desktop': !mobile }" v-if="movie">
    <header-watch
      class="watch__header"
      :class="{ 'watch__header--desktop': !mobile }"
    />
    <main class="watch__content">
      <iframe
        class="watch__video"
        :class="{ 'watch__video--desktop': !mobile }"
        v-if="iframe"
        width="560"
        height="315"
        :src="iframe"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <img
        class="watch__video watch__video--thumb"
        :class="{ 'watch__video--desktop': !mobile }"
        v-else
        :src="movie.backdrop"
      />
      <section class="watch__details" v-if="mobile">
        <h1 class="watch__title">{{ movie.title }}</h1>
        <p class="watch__year">{{ movie.year }}</p>
        <p class="watch__rating">{{ movie.rating }}</p>
        <p class="watch__plot">{{ movie.plot }}</p>
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
      mobile: true,
    }),
    computed: {
      ...mapState(useLoginStore, ["id"]),
      iframe() {
        if (this.movie.video) {
          const regExp =
            /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = this.movie.video.match(regExp);
          return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
        } else return undefined;
      },
    },
    methods: {
      ...mapActions(useAppStore, ["getMovieById", "addNewUserView"]),
    },
    async created() {
      const id = this.$route.params.id;

      if (!id) return;

      this.addNewUserView({ user_id: this.id, movie_id: id });

      this.movie = await this.getMovieById(id);

      const matches = window.matchMedia("screen and (min-width: 885px)");
      this.mobile = !matches.matches;
      matches.onchange = (match) => {
        this.mobile = !match.matches;
      };
    },
  };
</script>

<style lang="scss" scoped>
  .watch {
    display: flex;
    flex-flow: column nowrap;

    min-height: 100vh;

    background-color: #000;

    &:hover {
      .watch__header {
        &--desktop {
          transition: 200ms;
          opacity: 1;
        }
      }
    }

    &__header {
      &--desktop {
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;

        height: 60px;

        opacity: 0;
      }
    }

    &__video {
      width: 100%;
      height: calc(300px + 5vw);
      background-color: #000;
      border: none;

      &--desktop {
        z-index: 1;
        width: 100vw;
        height: 100vh;
        position: fixed;
      }

      &--thumb {
        object-fit: contain;
      }
    }

    &__details {
      padding-inline: 10px;
      font-size: 0.8rem;

      color: #fff;
    }

    &__title {
      margin: 0;
    }

    &__year {
      margin-top: 10px;
      color: rgba(255, 255, 255, 0.5);
      max-width: 20px;
    }

    &__rating {
      background-color: orangered;
      max-width: 20px;
    }

    &__plot {
      margin-top: 30px;
    }
  }
</style>
