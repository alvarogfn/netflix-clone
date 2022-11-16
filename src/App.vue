<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { db } from "./db";
  import genres from "../database/genres.json";

  export default {
    data: () => ({}),
    async created() {
      try {
        await db.genres.bulkAdd(genres);
      } catch (e) {
        if (e === "BulkError") return;
      }
    },
  };
</script>

<style lang="scss" scoped></style>
