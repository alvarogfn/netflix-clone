<template>
  <router-link class="profile" :to="{ name: 'profile' }">
    <img class="profile__image" :src="picture" />
    <p class="profile__name">{{ name }}</p>
    <p class="profile__label">Ver perfil</p>
  </router-link>
</template>

<script>
  export default {
    props: {
      name: String,
      picture: String,
      id: String,
    },
  };
</script>

<style lang="scss" scoped>
  .profile {
    display: grid;
    grid-template-areas:
      "picture name"
      "picture link";

    grid-template-rows: 15px 15px;
    grid-template-columns: 30px 1fr;
    row-gap: 5px;
    column-gap: 10px;

    &__name {
      text-transform: capitalize;
      grid-area: name;
    }

    &__label {
      grid-area: link;
      font-weight: 300;
      font-size: 0.7rem;
    }

    &__image {
      grid-area: picture;
      height: 100%;
      aspect-ratio: 1 / 1;
      object-fit: contain;

      border-radius: 5px;
    }
  }
</style>
