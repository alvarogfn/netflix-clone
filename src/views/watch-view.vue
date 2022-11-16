<template>
  <div>
    <header-watch />
    <main>
      <iframe
        src="https://www.youtube-nocookie.com/embed/j2Cv_aqWFqY?controls=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <section>
        <h1>Chainsaw man ending 3 - devil</h1>
      </section>
    </main>
  </div>
</template>

<script>
  import HeaderWatch from "../components/header/header-watch.vue";

  export default { components: { HeaderWatch } };
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-flow: column nowrap;

    min-height: 100vh;

    background-color: #000;
  }

  header {
    height: 50px;

    position: fixed;
  }

  main {
    color: #fff;
  }

  iframe {
    width: 100%;
    height: 300px;
    background-color: #000;
    border: none;
  }

  section {
    padding: 0 10px;
  }

  h1 {
    margin-top: 10px;
    font-size: 1.3rem;
  }
</style>
