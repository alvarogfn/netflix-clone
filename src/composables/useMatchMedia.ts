import { onMounted, onUnmounted, ref } from "vue";

export function useMatchMedia(query: string) {
  const media = window.matchMedia(query);
  const match = ref<boolean>(media.matches);

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
