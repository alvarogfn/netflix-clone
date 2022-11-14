<template>
  <main class="signup">
    <article class="signup__form form">
      <form @submit.prevent="submit">
        <h1 class="form__title">Unlimited movies, TV shows, and more.</h1>
        <h2 class="form__subtitle">Watch anywhere. Cancel anytime.</h2>
        <p class="form__paragraph">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div class="form__email">
          <label>
            <input v-model="email" class="form__input" />
          </label>
          <button class="form__submit">Vamos la ></button>
        </div>
      </form>
    </article>
  </main>
</template>

<script>
  import { mapActions, mapWritableState } from "pinia";
  import { useLoginStore } from "../stores/login";

  export default {
    data: () => ({
      email: "",
    }),
    computed: {
      ...mapWritableState(useLoginStore, { storeEmail: "email" }),
    },
    methods: {
      ...mapActions(useLoginStore, ["signup"]),
      async submit() {
        this.storeEmail = this.email;
        this.$router.push({ name: "signup" });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;
  .form {
    &__email {
      display: flex;
      flex-flow: row nowrap;

      label {
        display: flex;
        flex-grow: 1;
        height: 100%;
      }
    }

    &__input {
      flex: 1;
      background-color: #fff;
      height: 100%;

      color: black;
    }

    &__submit {
      background-color: $red;
      padding: 20px;
    }
  }
</style>
