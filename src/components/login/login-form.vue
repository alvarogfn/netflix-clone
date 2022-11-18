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

<script>
  import { mapActions, mapState } from "pinia";
  import LoginInput from "./login-input.vue";
  import { useLoginStore } from "../../stores/login";

  export default {
    components: { LoginInput },
    data: () => ({
      email: "",
      password: "",
      userNotFound: false,
    }),
    computed: {
      ...mapState(useLoginStore, ["islogged"]),
    },
    methods: {
      ...mapActions(useLoginStore, ["login"]),
      async submit() {
        try {
          await this.login(this.email, this.password);
          if (this.islogged) {
            localStorage.setItem("email", this.email);
            localStorage.setItem("password", this.password);
            this.$router.push({ name: "browse" });
          }
        } catch (e) {
          this.userNotFound = true;
        }
      },
    },
  };
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
