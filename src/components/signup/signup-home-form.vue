<template>
  <div class="register">
    <h1 class="register__title">Unlimited movies, TV shows, and more.</h1>
    <p class="register__paragraph">Watch anywhere. Cancel anytime.</p>
    <p class="register__paragraph">
      Ready to watch? Enter your email to create or restart your membership.
    </p>
    <form class="register__form" @submit.prevent="submit">
      <input
        v-model="email"
        class="register__input"
        type="email"
        placeholder="Email Address"
        required
      />
      <button class="register__submit">Get Started ></button>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapWritableState } from "pinia";

  import { useLoginStore } from "../../stores/login";

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
  @use "../../styles/colors.scss" as *;

  .register {
    text-align: center;
    &__title {
      font-size: 1.7rem;
    }

    &__paragraph {
      font-size: 1.2rem;
      margin: 10px 5px;
    }

    &__form {
      display: flex;
      flex-flow: column nowrap;
    }

    &__input {
      flex-grow: 1;
      background-color: #fff;
      border: 1px solid gray;

      font-size: 1rem;

      color: black;

      padding: 15px 10px;

      transition: border-radius 200ms;

      &::placeholder {
        font-size: 0.8rem;
        font-weight: 400;
        color: #8c8c8c;
      }

      &:focus {
        border-radius: 3px;
        border: 1px solid transparent;
      }
    }

    &__submit {
      margin: 40px auto;

      display: flex;

      align-items: center;
      justify-content: center;

      background-color: $red;

      width: 130px;
      height: 40px;

      border-radius: 3px;
    }
  }

  @media screen and (min-width: 500px) {
    .register {
      max-width: 500px;
      margin: 0 auto;

      &__title {
        font-size: 3.125rem;
      }

      &__paragraph:nth-child(2) {
        font-size: 1.625rem;
        margin-bottom: 30px;
      }

      &__paragraph:nth-child(3) {
        margin-inline: 40px;
      }
    }
  }

  @media screen and (min-width: 950px) {
    .register {
      max-width: 700px;

      &__paragraph:nth-child(3) {
        margin-inline: 0px;
        margin-bottom: 20px;
      }

      &__form {
        flex-flow: row nowrap;
        align-items: center;
        column-gap: 1px;

        height: 60px;
      }

      &__input {
        height: 100%;
        font-size: 1.1rem;

        &::placeholder {
          font-size: 1rem;
        }

        &:focus {
          border-radius: initial;
          border: 1px solid rgb(0, 162, 255);
        }
      }

      &__submit {
        width: 200px;
        font-size: 1.8rem;

        height: 100%;

        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
    }
  }
</style>
