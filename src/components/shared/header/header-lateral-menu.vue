<template>
  <div class="menu">
    <section class="menu__section menu__section--profile">
      <profile-card-link
        class="menu__profile"
        :name="loginStore.name!"
        :picture="picture"
        :id="loginStore.id!"
      />
    </section>
    <section class="menu__section menu__section--nav">
      <nav class="menu__nav">
        <ul class="menu__list">
          <li class="menu__item">
            <router-link class="menu__anchor" :to="{ name: 'browse' }">
              Inicio
            </router-link>
          </li>
          <li>
            <router-link class="menu__anchor" :to="{ name: 'metrics' }">
              Bombando
            </router-link>
          </li>
        </ul>
      </nav>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useBlobURL } from "@/composables/useBlobURL";
  import { useLoginStore } from "@/stores/login";
  import ProfileCardLink from "@/components/profile/profile-card-link.vue";

  const loginStore = useLoginStore();

  const picture = useBlobURL(loginStore.picture!);
</script>

<style lang="scss" scoped>
  .menu {
    width: calc(100vw - 90px);
    height: calc(100vh - 60px);

    background-color: #000;

    &__section {
      color: #999;
      font-weight: 700;

      &--profile {
        padding: 10px 15px 20px;
      }

      &--nav {
        padding-top: 5px;
        border-top: 1px solid #666;
      }
    }

    &__list {
      display: flex;
      flex-flow: column nowrap;
    }

    &__anchor {
      width: 100vw;
      padding: 7.5px 0 7.5px 20px;

      border-left: 3px solid transparent;

      &:hover {
        color: #fff;
      }
    }

    .router-link-active {
      color: #fff;
      border-left: 3px solid red;
    }
  }
</style>
