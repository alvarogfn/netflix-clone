import { onMounted, onUnmounted, ref } from "vue";

export function useMatchMedia(query: string) {
  const match = ref<boolean>(false);
  const media = window.matchMedia(query);

  function matchMedia(ev: MediaQueryListEvent) {
    match.value = ev.matches;
  }

  onMounted(() => {
    media.addEventListener("change", matchMedia);
  });

  onUnmounted(() => {
    media.removeEventListener("change", matchMedia);
  });

  return match;
}
