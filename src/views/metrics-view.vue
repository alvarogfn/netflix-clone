<template>
  <div>
    <header-browse></header-browse>
    <main>
      <movies-main-section
        title="Top Movies Watch in EUA"
        :movies="topMovies"
      />
      <metrics-top-watchers-list :users="users" />
    </main>
  </div>
</template>

<script>
  import { mapActions } from "pinia";
  import HeaderBrowse from "../components/header/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";
  import MetricsTopWatchersList from "../components/metrics/metrics-top-watchers-list.vue";
  import { useAppStore } from "../stores/app";

  export default {
    components: { HeaderBrowse, MoviesMainSection, MetricsTopWatchersList },
    data: () => ({
      users: [],
      topMovies: [],
    }),
    methods: {
      ...mapActions(useAppStore, ["topMovieWatchers", "getAllMovies"]),
    },
    async created() {
      this.topMovies = (await this.getAllMovies()).sort(
        (a, b) => a.relevance_percentile - b.relevance_percentile
      );
      this.users = await this.topMovieWatchers();
    },
  };
</script>

<style lang="scss" scoped>
  div {
    min-height: 100vh;
  }

  main {
    padding-top: 60px;
    margin-left: 10px;
  }
</style>
