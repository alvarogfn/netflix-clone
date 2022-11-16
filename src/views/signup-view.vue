<template>
  <main class="signup">
    <article class="signup__form">
      <form class="form" @submit.prevent="submit">
        <h1 class="form__title">Unlimited movies, TV shows, and more.</h1>
        <p class="form__paragraph">Watch anywhere. Cancel anytime.</p>
        <p class="form__paragraph">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div class="form__email">
          <label>
            <input
              v-model="email"
              class="form__input"
              placeholder="Email Address"
              required
            />
          </label>
          <button class="form__submit">Get started ></button>
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

  .signup {
    margin-top: 70px;
    padding-inline: 20px;
  }
  .form {
    text-align: center;

    &__title {
      font-size: 1.6rem;
      font-weight: 600;
    }

    &__paragraph {
      margin: 10px;
      font-size: 1.2rem;
    }

    &__email {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 15px;

      label {
        display: flex;
        flex-grow: 1;
      }

      input {
        height: 40px;
        border: 1px solid gray;
        padding-left: 10px;

        &::placeholder {
          font-size: 0.8rem;
          font-weight: 400;
        }
      }
    }

    &__input {
      flex: 1;
      background-color: #fff;
      height: 100%;

      color: black;
    }

    &__submit {
      margin: 0 auto;
      background-color: $red;

      height: 38px;
      width: 120px;

      border-radius: 4px;
    }
  }
</style>
