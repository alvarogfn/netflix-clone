<template>
  <section class="container">
    <h1 class="container__title">{{ title }}</h1>
    <ul class="container__list">
      <slot></slot>
    </ul>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    title: string;
    listHeight?: string;
  }

  const props = withDefaults(defineProps<Props>(), { listHeight: "200px" });
</script>

<style lang="scss" scoped>
  .container {
    overflow: hidden;

    &__list {
      box-sizing: content-box;

      display: flex;
      flex-flow: row nowrap;
      gap: 2.5px;

      margin-bottom: -15px;
      padding-bottom: 15px;

      overflow-x: scroll;
      overflow-y: hidden;

      max-width: calc(100vw - 17px);

      min-height: v-bind(listHeight);
    }

    &__title {
      height: 40px;
      max-width: calc(100vw - 30px);
      color: #999;
      font-size: 1.2rem;
      font-weight: 700;
      display: flex;
      align-items: flex-end;
    }
  }

  @media screen and (min-width: 885px) {
    .container {
      &__list {
        gap: 3px;
      }
      &__title {
        font-size: 1rem;
      }
    }
  }
</style>
