<template>
  <section>
    <list-horizontal
      title="Users who watched the most movies"
      list-height="100px"
    >
      <li
        class="top-users__item"
        v-for="({ user }, index) in ranking"
        :key="user.id"
      >
        <metrics-position-card :position="index + 1">
          <picture-with-name-card
            class="top-users__card"
            :name="user.name"
            :picture="useBlobURL(user.picture!).value"
          />
        </metrics-position-card>
      </li>
    </list-horizontal>
  </section>
</template>

<script lang="ts" setup>
  import { useBlobURL } from "@/composables/useBlobURL";
  import type { Movie, User } from "@/db";
  import { computed } from "vue";
  import ListHorizontal from "../utils/list-horizontal.vue";
  import PictureWithNameCard from "../utils/picture-with-name-card.vue";
  import MetricsPositionCard from "./metrics-position-card.vue";

  interface Props {
    users: { user: User; movies: Movie[] }[];
  }

  const props = defineProps<Props>();

  const ranking = computed(() => {
    return props.users
      .slice()
      .sort((a, b) => a.movies.length - b.movies.length)
      .reverse();
  });
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
