<template>
  <div class="container">
    Sorry, we can't find an account with this email address. Please try again or
    <router-link class="container__link" :to="{ name: 'home' }">
      create a new account.
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  @use "@/styles/components.scss" as *;
  .container {
    @include alert-card($font-size: 0.75rem);
    color: #fff;

    &__link {
      color: #fff;
      text-decoration: underline;
    }
  }
</style>
