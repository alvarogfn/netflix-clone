<template>
  <div class="container">
    <div class="container__icon">
      <icon-alert />
    </div>
    <div class="container__content">
      <p class="container__paragraph">
        <strong>Looks like that account already exists.</strong>
        <router-link class="container__link" :to="{ name: 'login' }">
          Sign into that account
        </router-link>
        or try using a different email.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IconAlert from "../icons/icon-alert.vue";
</script>

<style lang="scss" scoped>
  @use "@/styles/colors.scss" as *;
  @use "@/styles/components.scss" as *;

  .container {
    @include alert-card($color: $light-orange, $border-radius: 2.5px);
    color: #000;
    display: flex;
    flex-flow: row nowrap;
    column-gap: 20px;
    align-items: center;

    &__paragraph {
      font-size: 1.3rem;
      line-height: 1.8rem;

      @media screen and (min-width: 780px) {
        font-size: 1rem;
        line-height: 1.6rem;
      }
    }

    &__link {
      text-decoration: underline;
    }
  }
</style>
