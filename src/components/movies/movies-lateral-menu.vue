<template>
  <div class="menu">
    <section class="menu__section">
      <profile-card-link class="menu__profile" />
    </section>
    <section class="menu__section menu__section--nav">
      <nav class="menu__nav">
        <ul class="menu__list">
          <li class="menu__item">Incio</li>
          <li class="menu__item">Series</li>
          <li class="menu__item">Filmes</li>
          <li class="menu__item">Bombando</li>
          <li class="menu__item">Minha Lista</li>
          <li class="menu__item">Navegar por Idiomas</li>
        </ul>
      </nav>
    </section>
  </div>
</template>

<script>
  import { mapState } from "pinia";
  import { useLoginStore } from "../../stores/login";
  import ProfileCardLink from "../profile/profile-card-link.vue";

  export default {
    computed: {
      ...mapState(useLoginStore, ["email"]),
    },
    components: { ProfileCardLink },
  };
</script>

<style lang="scss" scoped>
  .menu {
    width: calc(100vw - 90px);
    height: calc(100vh - 60px);

    background-color: #000;

    &__section {
      color: #999;
      font-weight: 700;

      padding: 10px 15px;

      &--nav {
        border-top: 1px solid #666;
      }
    }

    &__list {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 20px;
    }

    &__item {
    }
  }
</style>
