<template>
  <div class="login">
    <header-login class="login__header" />
    <main class="login__content">
      <form class="login__form" @submit.prevent="handleSubmit">
        <h1 class="login__form-title">Sign In</h1>
        <div class="login__form-fieldset">
          <login-alert class="form__error" v-if="error" />
          <form-input
            class="login__form-input"
            id="email"
            label="Email"
            :patterns="Patterns.email"
            v-model:value="loginForm.email.value"
            @valid="loginForm.email.isValid = $event"
            required
          />
          <form-input
            class="login__form-input"
            id="password"
            label="password"
            type="password"
            :patterns="Patterns.password"
            v-model:value="loginForm.password.value"
            @valid="loginForm.password.isValid = $event"
            required
          />
        </div>
        <button class="login__form-submit" type="submit">Sign In</button>
      </form>
      <div class="login__details">
        <login-remember-check v-model:value="remember" />
        <p class="login__details-paragraph">
          New to Netflix?
          <router-link class="login__details-signup" :to="{ name: 'signup' }">
            Sign up now.</router-link
          >
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import LoginAlert from "@/components/login/login-alert.vue";
  import LoginRememberCheck from "@/components/login/login-remember-check.vue";
  import FormInput from "@/components/shared/form/form-input.vue";
  import { useLoginStore } from "@/stores/login";
  import { focusAllFormInputs } from "@/utils/focusAllFormInputs";
  import { Patterns } from "@/utils/Patterns";
  import { reactive, ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import HeaderLogin from "../components/header/header-login.vue";

  const loginStore = useLoginStore();
  const router = useRouter();

  const loginForm = reactive({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      isValid: false,
      value: "",
    },
  });

  const error = ref("");

  const isSubmittable = computed(() => {
    let isValid = false;
    for (const key in loginForm) {
      const index = key as keyof typeof loginForm;
      isValid = loginForm[index].isValid;
    }
    return isValid;
  });

  const remember = ref(false);

  async function handleSubmit(e: Event) {
    focusAllFormInputs(e.target as HTMLFormElement);
    if (!isSubmittable.value) return;
    try {
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      const response = await loginStore.login(
        loginForm.email.value,
        loginForm.password.value
      );
      if (!response) throw new Error("");

      if (remember.value) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }

      router.push({ name: "browse" });
    } catch (e) {
      const err = e as Error;
      error.value = err.toString();
    }
  }
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;
  @use "../styles/components.scss" as *;
  .login {
    background-color: #000;
    min-height: 100vh;
    height: fit-content;
    min-width: 150px;

    &__header {
      padding: 24px 12px;
      width: calc(85px + 10vw);
    }

    &__content {
      margin-inline: calc(5px + 3vw);
    }

    &__form {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 25px;

      &-title {
        font-weight: 600;
        color: #fff;
      }

      &-fieldset {
        display: flex;
        flex-flow: column nowrap;
        row-gap: 25px;
        border: none;
      }

      &-submit {
        @include button();
        border-radius: 5px;
      }
    }

    &__details {
      margin-top: 20px;
      display: flex;
      flex-flow: column nowrap;
      row-gap: 20px;

      &-paragraph {
        font-size: 0.9rem;
        color: #737373;
      }

      &-signup {
        color: #fff;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media screen and (min-width: 740px) {
    .login {
      background-image: linear-gradient(20deg, #00000093, #00000093),
        url("../assets/home-background.jpg");

      height: fit-content;

      background-position: center center, left left;
      background-size: cover, cover;
      background-repeat: no-repeat;

      &__header {
        width: calc(75px + 15vw);
      }

      &__content {
        background-color: rgba(0, 0, 0, 0.75);
        padding: 60px;

        max-width: 440px;

        border-radius: 5px;

        margin: 0 auto;
      }

      &__form {
        row-gap: 30px;
      }
    }
  }
</style>

<style lang="scss">
  @use "../styles/colors.scss" as *;
  @use "../styles/components.scss" as *;

  .login__form {
    .input {
      &__label {
        text-transform: capitalize;
        color: #8c8c8c;
        left: 25px;
        &--focus {
          font-size: 0.7rem;
        }
      }

      &__field {
        padding-inline: 25px;
        color: #fff;
        background-color: #333;
        border-radius: 5px;

        &:hover {
          background-color: #454545;
        }

        &::placeholder {
          text-transform: capitalize;
          font-size: 0.8rem;
        }

        &--error {
          border-bottom: 2px solid $orange;
        }
      }

      &__error {
        bottom: -12.5px;
        color: $orange;
        font-size: 0.8rem;
      }
    }
  }
</style>
