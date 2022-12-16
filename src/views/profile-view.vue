<template>
  <div class="profile">
    <header-browse class="profile__header" />
    <main class="profile__content">
      <button class="profile__logout" @click="loginStore.logout">logout</button>
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
        <movies-main-section title="Ultimos filmes vistos" :movies="movies" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import HeaderBrowse from "../components/header/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import { useLoginStore } from "../stores/login";
  import TitleTextLabel from "../components/utils/title-text-label.vue";
  import { onMounted, ref } from "vue";
  import { useBlobURL } from "@/composables/useBlobURL";
  import { db } from "@/database/database";

  const loginStore = useLoginStore();
  const url = useBlobURL(loginStore.picture!);

  const movies = ref<any[]>([]);

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
  @use "../styles/colors.scss" as *;

  .profile {
    height: 100vh;
    max-height: 100%;
    background-color: #141414;

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
        "logout"
        "name"
        "email"
        "history";

      padding: 80px 10px;

      gap: 20px;
    }

    &__field {
      color: #fff;
      font-weight: 600;
      text-transform: capitalize;

      &--name {
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

    &__logout {
      background-color: $red;
      color: #fff;
      padding: 10px;
      border-radius: 2px;

      width: 100px;

      grid-area: logout;

      justify-self: flex-end;
    }
  }

  @media screen and (min-width: 885px) {
    .profile {
      &__header {
        padding-left: calc(15px + 5vw);
      }
      &__content {
        padding-left: calc(15px + 5vw);

        grid-template-areas:
          "picture . logout"
          "picture email email"
          "picture name name"
          "history history history";
      }
    }
  }
</style>
