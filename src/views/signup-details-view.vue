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
        <form-input
          id="name"
          v-model:value="registerForm.name.value"
          @valid="registerForm.name.isValid = $event"
          label="Full name"
          required
        />
        <form-input
          id="email"
          v-model:value="registerForm.email.value"
          @valid="registerForm.email.isValid = $event"
          label="email"
          :pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
          patternMessage="Please write a valid e-mail."
          required
        />
        <form-input
          id="password"
          v-model:value="registerForm.password.value"
          @valid="registerForm.password.isValid = $event"
          label="create your password"
          type="password"
          required
        />
        <form-input-image
          id="avatar"
          label="Upload your profile picture"
          v-model:value="registerForm.picture.value"
          @valid="registerForm.picture.isValid = $event"
        />
        <button class="form__submit" :disabled="!isSubmittable">
          Iniciar Assinatura
        </button>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import HeaderSignup from "../components/header/header-signup.vue";
  import FormInput from "@/components/shared/form/form-input.vue";
  import { useLoginStore } from "../stores/login";
  import { computed, reactive } from "vue";
  import { useRouter } from "vue-router";
  import FormInputImage from "@/components/shared/form/form-input-image.vue";

  const loginStore = useLoginStore();
  const router = useRouter();

  const registerForm = reactive({
    name: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    picture: {
      value: new Blob(),
      isValid: false,
    },
  });

  const isSubmittable = computed(() => {
    return (
      registerForm.name.isValid &&
      registerForm.password.isValid &&
      registerForm.email.isValid &&
      registerForm.picture.isValid
    );
  });

  async function submit() {
    if (!isSubmittable.value) return;

    const response = await loginStore.signup(
      registerForm.email.value!,
      registerForm.password.value!,
      registerForm.name.value!,
      registerForm.picture.value!
    );

    if (!response) return;
    const isAuth = await loginStore.login(
      registerForm.email.value,
      registerForm.password.value
    );
    if (isAuth) router.push({ name: "browse" });
  }
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;
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

    &__submit {
      background-color: $red;
      border-radius: 3px;
      padding: 15px;
      font-weight: 600;
      color: #fff;

      transition: filter 200ms opacity 200ms;

      &:disabled {
        filter: grayscale(100%);
        opacity: 0.3;
      }
    }

    &__label {
      border: 1px solid red;
    }
  }
</style>
