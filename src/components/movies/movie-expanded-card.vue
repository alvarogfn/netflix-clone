<template>
  <route-link :to="{ name: 'watch', params: { id: movie.id } }" class="card">
    <youtube-iframe
      class="card__video"
      :allow-controls="false"
      :src="getYoutubeEmbedFromLink(movie.video)"
    />
    <div class="card__details">
      <p class="card__rating">{{ movie.rating ?? "L" }}</p>
      <p class="card__views">
        <span>
          {{ movie.views === 0 ? "no" : movie.views }}
        </span>
        {{ movie.views > 1 ? "views" : "view" }}
      </p>
      <ul class="card__tags">
        <li class="card__tag" v-for="genre in movie.genre_names" :key="genre">
          <span>•</span>{{ genre }}
        </li>
      </ul>
    </div>
  </route-link>
</template>

<script setup lang="ts">
  import type { Movie as MovieProp } from "@/database/database";
  import { getYoutubeEmbedFromLink } from "@/utils/getYoutubeEmbedFromLink";
  import YoutubeIframe from "../shared/utils/youtube-iframe.vue";

  interface Props {
    movie: MovieProp;
  }

  defineProps<Props>();
</script>

<style lang="scss" scoped>
  @use "@/styles/colors.scss" as *;

  .card {
    position: fixed;
    z-index: 2;

    display: flex;
    flex-flow: column nowrap;

    background-color: $black;

    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.7);

    border-radius: 5px;

    width: 300px;
    height: 275px;

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    cursor: pointer;

    &__video {
      flex-grow: 1;
      width: 100%;
      height: 150px;
      object-fit: cover;

      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &__details {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      gap: 10px;

      padding: 10px;

      min-height: 100px;

      color: #fff;

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
      font-size: 0.7rem;
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
  }
</style>
