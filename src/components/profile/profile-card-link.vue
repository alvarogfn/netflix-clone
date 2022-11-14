<template>
  <a class="profile">
    <img class="profile__image" src="../../assets/profile-picture.png" />
    <p class="profile__name">{{ name }}</p>
    <p class="profile__label">Ver perfil</p>
  </a>
</template>

<script>
  export default {
    props: {
      name: String,
    },
  };
</script>

<style lang="scss" scoped>
  .profile {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-template-rows: 15px 15px;
    column-gap: 5px;

    &__label {
      font-size: 0.8rem;
      font-weight: 400;
    }

    &__image {
      height: 100%;

      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }
  }
</style>
