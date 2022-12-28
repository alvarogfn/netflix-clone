<template>
  <div class="profile">
    <header-browse class="profile__header" />
    <main class="profile__content">
      <title-text-label
        class="profile__field profile__field--name"
        title="name"
        :content="loginStore.name!"
      />
      <title-text-label
        class="profile__field profile__field--email"
        title="email"
        :content="loginStore.email!"
      />
      <img class="profile__img" :src="url" alt="Profile Picture" />
      <section class="profile__history">
        <h1 class="profile__history-title">ultimos filmes vistos:</h1>
        <ul class="profile__movies">
          <li
            class="profile__movies-item"
            v-for="movie in movies"
            :key="movie.id"
          >
            <movie-card class="profile__movie" :movie="movie" />
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderBrowse from "../components/app/header-browse.vue";
  import { useLoginStore } from "../stores/login";
  import TitleTextLabel from "../components/utils/title-text-label.vue";
  import { onMounted, ref } from "vue";
  import { useBlobURL } from "@/composables/useBlobURL";
  import { db, type Movie } from "@/database/database";
  import MovieCard from "@/components/movies/movie-card.vue";

  const loginStore = useLoginStore();
  const url = useBlobURL(loginStore.picture!);

  const movies = ref<Movie[]>([]);

  onMounted(async () => {
    let history = await db.history
      .where("user_id")
      .equals(loginStore.id!)
      .toArray();

    history = history.sort((a, b) => a.played_at - b.played_at).reverse();

    movies.value = await db.movies
      .where("id")
      .anyOf(history.map(({ movie_id }) => movie_id))
      .sortBy("views");
  });
</script>

<style lang="scss" scoped>
  @use "../styles/components.scss" as *;

  .profile {
    position: relative;
    &__header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 15px;
    }

    &__content {
      display: grid;
      grid-template-areas:
        "picture"
        "name"
        "email"
        "history";

      padding: 120px 10px;

      gap: 20px;
    }

    &__field {
      color: #fff;
      font-weight: 600;

      &--name {
        text-transform: capitalize;
        grid-area: name;
      }

      &--email {
        grid-area: email;
      }
    }

    &__img {
      align-self: center;
      justify-self: center;

      grid-area: picture;

      max-width: 200px;

      box-shadow: 5px 5px 5px #0005;
    }

    &__history {
      grid-area: history;
    }

    &__history-title {
      height: 40px;
      max-width: calc(100vw - 30px);

      color: #999;

      font-size: 1.2rem;
      font-weight: 700;

      display: flex;
      align-items: flex-end;

      text-transform: capitalize;
    }
    &__movies {
      margin-top: 30px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 275px));
      gap: 20px;
    }

    &__logout {
      position: absolute;
      top: 80px;

      @include button();
    }
  }

  @media screen and (min-width: 885px) {
    .profile {
      &__header {
        padding-inline: calc(10px + 2.5vw);
      }
      &__content {
        padding-inline: calc(10px + 2.5vw);

        grid-template-areas:
          "picture name name name"
          "picture email email email"
          "history history history history";
      }
    }
  }
</style>
