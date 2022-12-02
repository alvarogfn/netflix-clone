<template>
  <form class="form" @submit.prevent="submit">
    <h1 class="form__title">Sign In</h1>
    <div class="form__fieldset">
      <div class="form__error" v-if="userNotFound">
        Sorry, we can't find an account with this email address. Please try
        again or
        <router-link class="form__link" :to="{ name: 'home' }">
          create a new account.
        </router-link>
      </div>
      <login-input
        class="form__login"
        placeholder="Email"
        type="email"
        v-model:value="email"
      />
      <login-input
        class="form__login"
        placeholder="password"
        v-model:value="password"
      />
    </div>
    <button class="form__submit" type="submit">Sign in</button>
  </form>
</template>

<script setup lang="ts">
  import LoginInput from "./login-input.vue";
  import { useLoginStore } from "../../stores/login";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const loginStore = useLoginStore();
  const router = useRouter();

  const email = ref<string | null>(null);
  const password = ref<string | null>(null);
  const error = ref<boolean>(false);

  async function submit() {
    if (email.value === null || password.value === null) return;
    try {
      const result = await loginStore.login(email.value, password.value);

      if (!result) return;

      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      router.push({ name: "browse" });
    } catch (e) {
      error.value = true;
    }
  }
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;

  .form {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 25px;

    color: #fff;

    &__fieldset {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 15px;
    }

    &__error {
      background-color: #e87c03;
      padding: 15px 20px;

      border-radius: 5px;

      font-size: 0.85rem;
    }

    &__link {
      color: #fff;
      text-decoration: underline;
    }

    &__title {
      margin: 15px 0 0;
    }

    &__submit {
      background-color: $red;

      border-radius: 5px;

      font-weight: 600;

      padding: 15px;
    }
  }

  @media screen and (min-width: 740px) {
    .form {
      max-width: 320px;
      margin: 0 auto;
      row-gap: 30px;
    }
  }
</style>
