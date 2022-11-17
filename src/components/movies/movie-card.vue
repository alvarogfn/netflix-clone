<template>
  <router-link :to="{ name: 'watch', params: { id } }">
    <img :src="thumb" />
  </router-link>
</template>

<script>
  export default {
    props: {
      thumb: String,
      id: {
        type: Number,
        default: 0,
      },
    },
  };
</script>

<style lang="scss" scoped>
  a {
    display: flex;
    width: 100%;
    height: 100%;
  }

  img {
    height: 100%;
    width: 100%;

    object-fit: contain;
  }
</style>
