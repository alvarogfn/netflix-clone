<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { db } from "./db";
  import genres from "../database/genres.json";
  import movies from "../database/movies.json";
  import { onMounted } from "vue";

  onMounted(async () => {
    try {
      await db.genres.bulkAdd(genres);
      await db.movies.bulkAdd(movies);
    } catch (e) {
      if (e instanceof Error && e.name === "BulkErrror") return;
    }
  });
</script>

<style lang="scss" scoped></style>
