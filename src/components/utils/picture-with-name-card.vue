<template>
  <div>
    <p>{{ name }}</p>
    <img :src="src" />
  </div>
</template>

<script setup lang="ts">
  import { useBlobURL } from "@/composables/useBlobURL";

  interface Props {
    name: string;
    picture: Blob;
  }

  const props = defineProps<Props>();
  const src = useBlobURL(props.picture);
</script>

<style lang="scss" scoped>
  div {
    position: relative;

    display: flex;

    min-width: 150px;
    min-height: 150px;

    p {
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      bottom: 0%;

      color: #fff;

      font-weight: 900;
      font-size: 1.3rem;
      text-transform: capitalize;

      text-shadow: 1px 1px black, -1px -1px black, -1px 0 black, 0 -1px black;
    }

    img {
      border-radius: 2.5px;
    }
  }
</style>
