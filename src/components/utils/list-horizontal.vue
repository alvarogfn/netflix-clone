<template>
  <section class="container">
    <h1 class="container__title">{{ title }}</h1>
    <ul ref="listElement" class="container__list">
      <button
        class="container__move container__move--prev"
        v-if="showPrevButton"
        @click="slidePrev"
      >
        <img
          class="container__move-img"
          src="@/assets/left-arrow.png"
          alt="<"
        />
      </button>
      <slot></slot>
      <button
        class="container__move container__move--next"
        v-if="showButtons"
        @click="slideNext"
      >
        <img
          class="container__move-img"
          src="@/assets/right-arrow.png"
          alt=">"
        />
      </button>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed, reactive } from "vue";

  interface Props {
    title: string;
    listHeight?: string;
  }

  const props = withDefaults(defineProps<Props>(), { listHeight: "200px" });

  const listElement = ref<HTMLElement | null>(null);

  const showButtons = ref<boolean>(false);

  const listDetails = reactive({
    scrollLeft: 0,
  });

  const showPrevButton = computed(() => {
    if (!listElement.value) return false;
    if (!showButtons.value) return false;
    return listDetails.scrollLeft > 0;
  });

  function slideNext() {
    if (!listElement.value) return;
    listElement.value?.scroll({
      left: window.innerWidth,
      behavior: "smooth",
    });
  }

  function slidePrev() {
    if (!listElement.value) return;
    listElement.value?.scroll({
      left: listElement.value.scrollLeft - window.innerWidth,
      behavior: "smooth",
    });
  }

  function updateScroll(e: Event) {
    const element = e.target as HTMLElement;
    listDetails.scrollLeft = element.scrollLeft;
  }

  onMounted(() => {
    if (!listElement.value) return;
    listElement.value.addEventListener("scroll", updateScroll);
    showButtons.value = listElement.value.scrollWidth > window.innerWidth;
  });

  onUnmounted(() => {
    if (!listElement.value) return;
    listElement.value.removeEventListener("scroll", updateScroll);
  });
</script>

<style lang="scss" scoped>
  .container {
    // overflow: hidden;
    position: relative;

    &__list {
      box-sizing: content-box;

      display: flex;
      flex-flow: row nowrap;
      gap: 2.5px;

      margin-bottom: -15px;
      padding-bottom: 15px;

      max-width: calc(100vw - 17px);
      width: fit-content;

      min-height: v-bind(listHeight);

      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__move {
      opacity: 0;

      position: absolute;

      width: 55px;

      top: 54px;
      bottom: 0px;

      color: white;
      background-color: #0005;
      font-weight: 900;

      transition: 200ms;

      &:hover {
        opacity: 1;
      }

      &-img {
        width: 30px;
        height: 30px;
      }

      &--prev {
        left: 0;
      }

      &--next {
        right: 0;
      }
    }

    &__title {
      height: 40px;
      margin-bottom: 15px;
      max-width: calc(100vw - 30px);
      color: #fff;
      font-size: 1.2rem;
      font-weight: 700;
      display: flex;
      align-items: flex-end;
    }
  }

  @media screen and (min-width: 885px) {
    .container {
      &__list {
        gap: 3px;
      }
      &__title {
        font-size: 1rem;
      }
    }
  }
</style>
