import { ref, onMounted, onUnmounted } from "vue";

export function useBlobURL(blob: Blob) {
  const url = ref("");

  onMounted(() => (url.value = URL.createObjectURL(blob)));

  onUnmounted(() => URL.revokeObjectURL(url.value));

  return url;
}
