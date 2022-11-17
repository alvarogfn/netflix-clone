<template>
  <router-link :to="{ name: 'watch', params: { id } }">
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
