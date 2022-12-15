<template>
  <div class="register">
    <h1 class="register__title"></h1>
    <p class="register__paragraph">Watch anywhere. Cancel anytime.</p>
    <p class="register__paragraph">
      Ready to watch? Enter your email to create or restart your membership.
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import { useLoginStore } from "../../stores/login";
  import FormInput from "../shared/form/form-input.vue";

  const loginStore = useLoginStore();

  const router = useRouter();

  const email = ref<string>("");

  function submit() {
    loginStore.email = email.value;
    router.push({ name: "signup" });
  }
</script>

<style lang="scss" scoped>
  @use "@/styles/components.scss" as *;

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
      @include button();

      width: 130px;
      height: 40px;

      font-size: 0.85rem;
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
          border: 1px solid #00a2ff;
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
