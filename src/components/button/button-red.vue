<template>
  <button class="button">{{ content }}</button>
</template>

<script>
  export default {
    props: {
      content: String,
    },
  };
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .button {
    background-color: $red;
    padding: 10px 15px;
    color: #fff;
    font-weight: 500;
    text-transform: lowercase;

    border-radius: 2px;

    &::first-letter {
      text-transform: capitalize;
    }
  }
</style>
