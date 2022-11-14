<template>
  <a>
    <img :src="thumb" />
  </a>
</template>

<script>
  export default {
    props: {
      thumb: String,
    },
  };
</script>

<style lang="scss" scoped></style>
