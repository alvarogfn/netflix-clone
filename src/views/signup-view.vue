<template>
  <div class="home">
    <div class="home__signup">
      <header-home class="home__header" />
      <main class="home__register">
        <signup-home-form />
      </main>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapWritableState } from "pinia";
  import HeaderHome from "../components/header/header-home.vue";
  import SignupHomeForm from "../components/signup/signup-home-form.vue";
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
    components: { HeaderHome, SignupHomeForm },
  };
</script>

<style lang="scss" scoped>
  @use "../styles/colors.scss" as *;

  .home {
    display: flex;
    flex-flow: column nowrap;

    margin: 0 auto;

    min-height: 100vh;

    color: #fff;

    background-color: black;

    &__signup {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 70px;

      padding: 22px;

      background-color: #000;
      background-image: linear-gradient(
          0deg,
          #000000dd 0%,
          #00000050 20%,
          #00000050 50%,
          #00000050 80%,
          #000000dd 99%
        ),
        url("../assets/home-background.jpg");

      background-repeat: no-repeat, no-repeat;
      background-size: cover, cover;
      background-position: right center, center center;

      border-bottom: 7px solid #292929;

      min-height: 550px;
    }
  }

  @media screen and (min-width: 550px) {
    .home {
      &__signup {
        padding: 25px 45px;
        row-gap: 100px;
      }
    }
  }

  @media screen and (min-width: 950px) {
    .home {
      &__signup {
        padding: 30px 60px;

        padding-bottom: 200px;
      }
    }
  }
</style>
