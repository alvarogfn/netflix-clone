import { ref, type Ref, onMounted, onUnmounted, unref, watch } from "vue";

interface Pattern {
  regexp: RegExp;
  message: string;
}

export function useInput(
  el: Ref<HTMLInputElement | null>,
  patterns: Pattern[]
) {
  const input = ref("");

  const error = ref("");

  watch(error, (newError) => {
    element?.setCustomValidity(newError);
  });

  const element = unref(el);

  function validate() {
    error.value = "";
    patterns.forEach((pattern) => {
      if (!pattern.regexp.test(input.value)) {
        error.value = pattern.message;
      }
    });
  }

  function handleInput() {
    input.value = element?.value ?? "";
  }

  onMounted(() => {
    element?.addEventListener("change", validate);
    element?.addEventListener("input", handleInput);
  });

  onUnmounted(() => {});

  return { input, error };
}
