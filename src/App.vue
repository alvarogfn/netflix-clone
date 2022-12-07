<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { db } from "./db";
  import { data as genres } from "../database/genres";
  import { data as movies } from "../database/movies";
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
