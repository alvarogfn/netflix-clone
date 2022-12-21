<template>
  <section
    class="card"
    :class="{ 'card--hover': preview.open }"
    @mouseenter="handleHover"
    @mouseleave="handleLeave"
  >
    <router-link
      class="card__link"
      :to="{ name: 'watch', params: { id: movie.id! } }"
    >
      <img class="card__img" :src="movie.backdrop" v-if="!preview.open" />
      <youtube-iframe
        class="card__img"
        @load="videoLoaded = true"
        :allow-controls="false"
        :src="getYoutubeEmbedFromLink(movie.video)"
        v-else
      />
      <transition name="details">
        <div class="card__details" v-if="preview.open">
          <p class="card__rating">{{ movie.rating ?? "L" }}</p>
          <p class="card__views">
            <span>
              {{ movie.views }}
            </span>
            {{ movie.views > 1 ? "visualizações" : "visualização" }}...
          </p>
          <ul class="card__tags">
            <li
              class="card__tag"
              v-for="genre in movie.genre_names"
              :key="genre"
            >
              <span>•</span>{{ genre }}
            </li>
          </ul>
        </div>
      </transition>
    </router-link>
  </section>
</template>

<script lang="ts" setup>
  import type { Movie as MovieProp } from "@/database/database";
  import { getYoutubeEmbedFromLink } from "@/utils/getYoutubeEmbedFromLink";
  import { reactive, watch, ref } from "vue";
  import YoutubeIframe from "../shared/utils/youtube-iframe.vue";

  interface Props {
    movie: MovieProp;
  }

  const preview = reactive({
    open: false,
    timeout: 0,
  });

  const props = defineProps<Props>();

  const videoLoaded = ref(false);

  function handleHover(event: Event) {
    const element = event.target as HTMLElement;
    element.style.zIndex = "2";
    clearTimeout(preview.timeout);
    preview.timeout = setTimeout(() => {
      preview.open = true;
    }, 500);
  }

  function handleLeave(event: Event) {
    const element = event.target as HTMLElement;
    element.style.zIndex = "";

    clearTimeout(preview.timeout);
    preview.open = false;
  }
</script>

<style lang="scss" scoped>
  @use "@/styles/colors.scss" as *;
  .card {
    position: relative;
    transition: scale 500ms, z-index 4s;

    &--hover {
      z-index: 3;
      position: relative;
      scale: 1.3;

      .card {
        &__img {
          border-end-end-radius: 0;
          border-end-start-radius: 0;
          background-color: #141414;
        }

        &__details {
          position: absolute;
          top: 100%;
          right: 0;
          left: 0;
        }
      }
    }

    &__details {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      gap: 10px;

      padding: 10px;

      color: #fff;
      background-color: #141414;

      border-bottom-left-radius: 2.5px;
      border-bottom-right-radius: 2.5px;
    }

    &__rating {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 0.9rem;
      font-weight: 900;

      background-color: $orange;

      min-width: 20px;

      padding: 2.5px;

      border-radius: 2.5px;
    }

    &__views {
      font-size: 0.8rem;
      color: #fff5;
      span {
        font-weight: 600;
      }
    }

    &__tags {
      flex-basis: 100%;
      display: flex;
      flex-flow: row wrap;
      gap: 5px;
      font-size: 0.7rem;

      color: #fff;
    }

    &__tag {
      span {
        margin-right: 5px;
        color: #686868;
      }
    }

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

  .details {
    &-enter {
      &-active {
        transition: 200ms;
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
      }

      &-from {
        opacity: 0;
      }

      &-to {
        opacity: 1;
      }
    }

    &-leave {
      &-active {
        transition: 200ms;
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
      }
      &-from {
        opacity: 1;
      }
      &-to {
        opacity: 0;
      }
    }
  }

  @media screen and (min-width: 885px) {
    .card__img {
      border-radius: 3px;
    }
  }
</style>
