<template>
  <main class="login">
    <div v-if="userNotFound">
      Nao foi possivel localizar esse usuario na base de dados
    </div>
    <form class="login__form form" @submit.prevent="submit">
      <login-input class="form__login" type="email" v-model:value="email" />
      <login-input class="form__login" v-model:value="password" />
      <button class="form__button" type="submit">Entrar</button>
    </form>
  </main>
</template>

<script>
  import { mapActions, mapState } from "pinia";
  import LoginInput from "../components/login/login-input.vue";

  import { useLoginStore } from "../stores/login";

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
        } catch (e) {
          this.userNotFound = true;
        }
      },
    },
    watch: {
      islogged(isLogged) {
        if (isLogged) this.$router.push({ name: "browse" });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;
  .login {
    margin: 30px 0;
    // background-color: red;
  }

  .form {
    margin: 0 auto;

    display: flex;
    flex-flow: column nowrap;
    row-gap: 20px;

    max-width: 400px;
    padding: 50px;

    background-color: rgba(0, 0, 0, 0.521);

    border-radius: 10px;

    &__button {
      background-color: $red;
      padding: 10px 0;
      font-weight: 600;
    }
  }
</style>
