<template>
  <header class="header">
    <app-logo-icon class="header__icon" />
    <nav style="display: none">
      <ul>
        <li>Incio</li>
        <li>Series</li>
        <li>Filmes</li>
        <li>Bombando</li>
        <li>Minha Lista</li>
        <li>Navegar por Idiomas</li>
      </ul>
    </nav>
  </header>
</template>

<script>
  import AppLogoIcon from "../icons/app-logo-icon.vue";

  export default {
    components: { AppLogoIcon },
  };
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    height: 60px;

    padding: 0 15px;

    background: #141414;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 10%, trasnparent 90%);

    &__icon {
      fill: $red;
      width: 100px;
    }
  }
</style>
