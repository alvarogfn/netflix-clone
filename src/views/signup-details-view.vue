<template>
  <div class="signup">
    <header-signup class="signup__header" />
    <main class="signup__content">
      <form class="signup__form form" @submit.prevent="submit">
        <h1 class="form__title">
          Create a password to start your subscription
        </h1>
        <p class="form__paragraph">Just a few more steps to go!</p>
        <p class="form__paragraph">We also hate forms.</p>
        <signup-input v-model:value="name" label="Add your name" />
        <signup-input v-model:value="email" label="add your email" />
        <signup-input v-model:value="password" label="create your password" />
        <signup-image-input
          v-model:value="picture"
          label="Select your profile picture"
        />
        <button-red content="Iniciar Assinatura" />
      </form>
    </main>
  </div>
</template>

<script>
  import { mapActions, mapWritableState } from "pinia";
  import HeaderSignup from "../components/header/header-signup.vue";
  import SignupInput from "../components/signup/signup-input.vue";
  import SignupImageInput from "../components/signup/signup-image-input.vue";
  import { useLoginStore } from "../stores/login";
  import ButtonRed from "../components/button/button-red.vue";

  export default {
    components: { HeaderSignup, SignupInput, SignupImageInput, ButtonRed },
    data: () => ({
      name: "",
      password: "",
      picture: undefined,
    }),
    computed: {
      ...mapWritableState(useLoginStore, ["email", "id"]),
    },
    methods: {
      ...mapActions(useLoginStore, ["signup"]),
      async submit() {
        await this.signup(this.email, this.password, this.name, this.picture);
        if (this.id) this.$router.push({ name: "home" });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .signup {
    &__content {
      padding-top: 30px;

      color: #444444;

      max-width: 400px;
      width: calc(100vw - 25px);

      margin: 0 auto;
    }
  }
  .form {
    max-width: 400px;
    margin: 0 auto;

    display: flex;
    flex-flow: column nowrap;
    row-gap: 10px;

    &__title {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }

    &__paragraph {
      margin: 0;
      font-size: 0.9rem;
      line-height: 13px;
    }
  }
</style>
