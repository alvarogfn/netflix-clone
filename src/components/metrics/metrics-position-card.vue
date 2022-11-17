<template>
  <div class="position">
    <p class="position__number">{{ this.position }}</p>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      position: [Number, String],
    },
  };
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
