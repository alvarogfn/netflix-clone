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
        <signup-input v-model:value="name" label="Add your name" required />
        <signup-input
          v-model:value="email"
          type="email"
          label="add your email"
          required
        />
        <signup-input
          v-model:value="password"
          label="create your password"
          type="password"
          required
        />
        <signup-image-input
          required
          v-model:value="picture"
          label="Select your profile picture"
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
  import SignupInput from "../components/signup/signup-input.vue";
  import SignupImageInput from "../components/signup/signup-image-input.vue";
  import { useLoginStore } from "../stores/login";
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";

  const loginStore = useLoginStore();
  const router = useRouter();

  const name = ref("");
  const password = ref("");
  const picture = ref<Blob | null>(null);
  const email = ref(loginStore.email ?? "");

  const isSubmittable = computed(() => {
    return email.value && password.value && name.value && picture.value;
  });

  async function submit() {
    if (!isSubmittable.value) return;

    const response = await loginStore.signup(
      email.value!,
      password.value!,
      name.value!,
      picture.value!
    );

    if (!response) return;
    const isAuth = await loginStore.login(email.value, password.value);
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
  }
</style>
