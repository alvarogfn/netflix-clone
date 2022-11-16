<template>
  <router-link :to="{ name: 'watch', params: { id: 1 } }">
    <img :src="thumb" />
  </router-link>
</template>

<script>
  export default {
    props: {
      thumb: String,
      id: String,
    },
  };
</script>

<style lang="scss" scoped></style>
