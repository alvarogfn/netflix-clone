import { ref, onMounted, onUnmounted } from "vue";

export function useBlobURL(blob?: Blob) {
  const url = ref("");

  onMounted(() => {
    try {
      if (blob) url.value = URL.createObjectURL(blob);
    } catch (e) {
      URL.revokeObjectURL(url.value);
    }
  });

  onUnmounted(() => URL.revokeObjectURL(url.value));

  return url;
}
