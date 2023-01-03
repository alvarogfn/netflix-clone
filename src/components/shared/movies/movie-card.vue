<template>
  <section
    class="card"
    @mouseenter="handleMouseIn"
    ref="card"
    @mouseout="handleMouseOut"
  >
    <router-link
      class="card__link"
      :to="{ name: 'watch', params: { id: movie.id } }"
    >
      <img class="card__img" :src="movie.backdrop" />
    </router-link>
    <Teleport to="#app" :disabled="!preview.open">
      <Transition name="details">
        <movie-expanded-card
          v-if="preview.open"
          :style="styles"
          :movie="movie"
          class="expanded-card"
          @mouseout="handleMouseLeave"
        />
      </Transition>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
  import type { Movie as MovieProp } from "@/database/database";
  import { reactive, computed, ref } from "vue";
  import MovieExpandedCard from "./movie-expanded-card.vue";

  interface Props {
    movie: MovieProp;
  }

  const preview = reactive({
    open: false,
    timeout: 0,
  });

  defineProps<Props>();

  function handleMouseIn() {
    clearTimeout(preview.timeout);
    window.addEventListener("mousemove", trackMousePosition);
    preview.timeout = setTimeout(() => {
      preview.open = true;
    }, 1000);
  }

  function handleMouseLeave() {
    clearTimeout(preview.timeout);
    preview.open = false;
    window.removeEventListener("mousemove", trackMousePosition);
  }

  function handleMouseOut() {
    clearTimeout(preview.timeout);
    window.removeEventListener("mousemove", trackMousePosition);
  }

  const card = ref<HTMLElement | null>(null);

  const position = reactive({
    left: 0,
    top: 0,
  });

  const styles = computed(() => ({
    top: position.top + "px",
    left: position.left + "px",
  }));

  function trackMousePosition(event: MouseEvent) {
    position.top = event.y;
    position.left = event.x;
  }
</script>

<style lang="scss" scoped>
  @use "@/styles/colors.scss" as *;

  .card {
    cursor: pointer;

    &__link {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      height: 100%;
    }

    &__img {
      height: 100%;
      width: 100%;

      object-fit: cover;
    }
  }

  .expanded-card {
    scale: 1.3;
  }

  .details {
    &-enter {
      &-active {
        transition: 200ms;
      }

      &-from {
        scale: 1;
      }

      &-to {
        scale: 1.3;
      }
    }

    &-leave {
      &-active {
        transition: 200ms;
      }
      &-from {
        scale: 1.3;
      }
      &-to {
        scale: 0;
      }
    }
  }

  @media screen and (min-width: 885px) {
    .card__img {
      border-radius: 3px;
    }
  }
</style>
