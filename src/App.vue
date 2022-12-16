<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { db } from "@/database/database";
  import { data as genres } from "../database/genres";
  import { data as movies } from "../database/movies";
  import { onMounted } from "vue";

  onMounted(async () => {
    try {
      const genresArr = await db.genres.toArray();
      const moviesArr = await db.movies.toArray();
      if (genresArr.length === 0) {
        await db.genres.bulkAdd(genres);
      }
      if (moviesArr.length === 0) {
        await db.movies.bulkAdd(movies);
      }
    } catch (e) {
      if (e instanceof Error && e.name === "BulkErrror") return;
    }
  });
</script>

<style lang="scss" scoped></style>
