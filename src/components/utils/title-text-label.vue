<template>
  <div class="label">
    <p class="label__title">{{ title }}</p>
    <p class="label__content">{{ content }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      content: String,
    },
  };
</script>

<style lang="scss" scoped>
  .label {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 10px;

    color: #fff;

    &__title {
      font-weight: 600;

      text-transform: capitalize;

      color: lighten($color: #141414, $amount: 40%);
    }

    &__content {
      padding: 10px;
      background-color: darken($color: #141414, $amount: 1%);
      border: 1px solid darken($color: #141414, $amount: 5%);

      border-radius: 5px;
    }
  }
</style>
