<template>
  <section>
    <list-horizontal title="Users who watched the most movies">
      <li
        class="top-users__item"
        v-for="({ user }, index) in ranking"
        :key="user.id"
      >
        <metrics-position-card :position="++index">
          <picture-with-name-card
            class="top-users__card"
            :name="user.name"
            :picture="getHref(user.picture)"
          />
        </metrics-position-card>
      </li>
    </list-horizontal>
  </section>
</template>

<script>
  import ListHorizontal from "../utils/list-horizontal.vue";
  import PictureWithNameCard from "../utils/picture-with-name-card.vue";
  import MetricsPositionCard from "./metrics-position-card.vue";

  export default {
    components: {
      ListHorizontal,
      MetricsPositionCard,
      PictureWithNameCard,
    },
    props: {
      users: Array,
    },
    methods: {
      getHref(blob) {
        return URL.createObjectURL(blob);
      },
    },
    computed: {
      ranking() {
        return this.users.slice().sort((a, b) => a.movies - b.movies);
      },
    },
    created() {
      this.users.forEach((user) => console.log(user.user_id));
    },
  };
</script>

<style lang="scss" scoped>
  .top-users {
    &__item {
      flex-shrink: 0;
      flex-basis: 150px;
    }

    &__card {
      width: 10px;
    }
  }
</style>
