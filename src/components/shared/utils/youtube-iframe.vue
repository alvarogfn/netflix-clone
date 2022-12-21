<template>
  <iframe
    width="560"
    height="315"
    :src="src"
    :title="props.title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    :allowfullscreen="props.allowfullscreen"
    @load="emit('load', $event)"
  ></iframe>
</template>

<script setup lang="ts">
  import { computed, watch } from "vue";

  interface Props {
    src: string;
    title?: string;
    allowfullscreen?: boolean;
    allowControls?: boolean;
  }

  interface Emit {
    (e: "load", payload: Event): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    allowfullscreen: false,
    allowControls: true,
    title: "Youtube Media",
  });

  const emit = defineEmits<Emit>();

  const src = computed(() => {
    const url = new URL(props.src);

    if (props.allowControls) {
      url.searchParams.append("controls", "1");
      url.searchParams.append("autoplay", "1");
    }
    return url.href;
  });
</script>

<style scoped></style>
