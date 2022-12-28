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
            :picture="user.picture"
          />
        </metrics-position-card>
      </li>
    </list-horizontal>
  </section>
</template>

<script lang="ts" setup>
  import type { User } from "@/database/database";
  import { computed } from "vue";
  import ListHorizontal from "../shared/list/list-horizontal.vue";
  import PictureWithNameCard from "./metrics-picture-name-card.vue";
  import MetricsPositionCard from "./metrics-position-card.vue";

  interface Props {
    users: { user: User; views: number }[];
  }

  const props = defineProps<Props>();

  const ranking = computed(() => {
    return props.users
      .slice()
      .sort((a, b) => a.views - b.views)
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
