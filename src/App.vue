<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { db } from "./db";
  import genres from "../database/genres.json";
  import movies from "../database/movies.json";

  export default {
    data: () => ({}),
    async created() {
      try {
        await db.genres.bulkAdd(genres);
        await db.movies.bulkAdd(movies);
      } catch (e) {
        if (e.name === "BulkError") return;
      }
    },
  };
</script>

<style lang="scss" scoped></style>
