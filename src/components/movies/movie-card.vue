<template>
  <router-link class="card" :to="{ name: 'watch', params: { id } }">
    <img class="card__img" :src="thumb" />
  </router-link>
</template>

<script lang="ts" setup>
  interface Props {
    thumb: string;
    id: number;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    width: 100%;
    height: 100%;

    &__img {
      height: 100%;
      width: 100%;

      object-fit: cover;
    }
  }

  @media screen and (min-width: 885px) {
    .card__img {
      border-radius: 3px;
    }
  }
</style>
