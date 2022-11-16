<template>
  <div>
    <header-browse></header-browse>
    <main>
      <movies-main-section
        title="Top Movies Watch in EUA"
        :movies="[
          {
            thumb:
              'https://i0.wp.com/www.jbox.com.br/wp/wp-content/uploads/2022/02/bleach-temporada-3-dvd-destacada.jpg?fit=774%2C489&quality=99&strip=all&ssl=1',
          },
        ]"
      />
    </main>
  </div>
</template>

<script>
  import HeaderBrowse from "../components/header/header-browse.vue";
  import MoviesMainSection from "../components/movies/movies-main-section.vue";

  export default { components: { HeaderBrowse, MoviesMainSection } };
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
