<template>
  <router-link class="link" :to="{ name: 'login' }">entrar</router-link>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;

    padding: 0px 20px;

    background-color: $red;
    color: #fff;

    font-weight: 500;
    text-transform: capitalize;

    border-radius: 5px;
  }
</style>
