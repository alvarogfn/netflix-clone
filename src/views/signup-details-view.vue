<template>
  <div class="signup">
    <header-signup class="signup__header" />
    <main class="signup__content">
      <signup-signup-error class="signup__error" v-if="error" />
      <form class="signup__form form" @submit.prevent="submit">
        <h1 class="form__title">Create a password to start your membership</h1>
        <p class="form__paragraph">Just a few more steps and you're done!</p>
        <p class="form__paragraph">We hate paperwork, too.</p>
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
          :patterns="Patterns.email"
          required
        />
        <form-input
          id="password"
          v-model:value="registerForm.password.value"
          @valid="registerForm.password.isValid = $event"
          label="Add a password"
          :patterns="Patterns.password"
          type="password"
          required
        />
        <form-input-image
          id="avatar"
          label="Upload your profile picture"
          v-model:value="registerForm.picture.value"
          @valid="registerForm.picture.isValid = $event"
        />
        <button class="form__submit">Next</button>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import HeaderSignup from "../components/header/header-signup.vue";
  import FormInput from "@/components/shared/form/form-input.vue";
  import { useLoginStore } from "../stores/login";
  import { computed, reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import FormInputImage from "@/components/shared/form/form-input-image.vue";
  import { Patterns } from "@/utils/Patterns";
  import { focusAllFormInputs } from "@/utils/focusAllFormInputs";
  import SignupSignupError from "@/components/signup/signup-signup-error.vue";

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

  const error = ref<boolean>(false);

  async function submit(e: Event) {
    focusAllFormInputs(e.target as HTMLFormElement);
    if (!isSubmittable.value) return;
    try {
      const response = await loginStore.signup(
        registerForm.email.value,
        registerForm.password.value,
        registerForm.name.value,
        registerForm.picture.value
      );

      if (!response) return;

      const isAuth = await loginStore.login(
        registerForm.email.value,
        registerForm.password.value
      );

      if (isAuth) router.push({ name: "browse" });
    } catch (e) {
      error.value = true;
      window.scrollY = 0;
    }
  }
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;
  .signup {
    &__content {
      padding-top: 30px;

      color: #444444;

      max-width: 400px;
      width: calc(100vw - 60px);

      margin: 0 auto;
    }
  }

  .form {
    max-width: 400px;
    margin: 20px auto;

    display: flex;
    flex-flow: column nowrap;
    row-gap: 15px;

    &__title {
      font-weight: 600;
      font-size: 1.8rem;
      margin-bottom: 5px;
    }

    &__paragraph {
      margin-bottom: 10px;
      font-size: 1rem;
    }

    &__submit {
      background-color: $red;
      color: #fff;
      box-shadow: 0 1px 1px rgba($color: #000000, $alpha: 0.25);

      font-weight: 600;

      border-radius: 3px;

      padding: 15px;

      transition: filter 200ms opacity 200ms;

      &:disabled {
        filter: grayscale(100%);
        opacity: 0.3;
      }
    }
  }
</style>

<style lang="scss">
  @use "@/styles/colors.scss" as *;

  .form {
    .input {
      &__label {
        color: #0005;
        &::first-letter {
          text-transform: uppercase;
        }
        &--focus {
          font-size: 0.7rem;
          font-weight: 600;
        }
      }

      &__field {
        border: 1px solid rgba(0, 0, 0, 0.5);
        box-shadow: 0 0 1px #0005 inset;
        border-radius: 2px;

        &:focus {
          border: 1px solid $blue;
        }

        &::placeholder {
          text-transform: capitalize;
        }

        &:not(:placeholder-shown):not(:invalid) {
          border: 1px solid #5fa53f;
        }

        &--error {
          border-color: $red;
        }
      }

      &__error {
        font-size: 0.75rem;
        margin-top: 2.5px;
        color: $red;
      }
    }
  }
</style>
