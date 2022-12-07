<template>
  <div class="position">
    <p class="position__number">{{ position }}</p>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    position: number | string;
  }
  defineProps<Props>();
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;

  .position {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    &__number {
      margin-right: -15px;
      font-weight: 900;
      font-size: 7rem;
      color: #fff;
    }
  }
</style>
