<template>
  <div class="signup">
    <signup-header style="fill: red" />
    <main class="signup__content">
      <form class="signup__form form" @submit.prevent="submit">
        <h1>Crie sua conta</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          excepturi deserunt reprehenderit in aliquid.
        </p>
        <signup-input v-model:value="name" label="name" />
        <signup-input v-model:value="email" label="email" />
        <signup-input v-model:value="password" label="password" />
        <signup-image-input v-model:value="picture" label="picture" />
        <button-red content="Iniciar Assinatura" />
      </form>
    </main>
  </div>
</template>

<script>
  import { mapActions, mapWritableState } from "pinia";
  import SignupHeader from "../components/signup/signup-header.vue";
  import SignupInput from "../components/signup/signup-input.vue";
  import SignupImageInput from "../components/signup/signup-image-input.vue";
  import { useLoginStore } from "../stores/login";
  import ButtonRed from "../components/button/button-red.vue";

  export default {
    components: { SignupHeader, SignupInput, SignupImageInput, ButtonRed },
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
  .form {
    max-width: 400px;
    margin: 0 auto;

    display: flex;
    flex-flow: column nowrap;
    row-gap: 10px;
  }
</style>
