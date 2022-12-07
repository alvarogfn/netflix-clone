<template>
  <label for="avatar" :style="styles">
    <span>{{ label }}</span>
    <input
      type="file"
      @change="submit($event)"
      accept="image/png, image/jpeg, image/webp, image/gif"
      name="avatar"
      id="avatar"
      :required="required"
    />
  </label>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue";

  interface Props {
    label: string;
    required: boolean;
  }

  interface Emit {
    (e: "update:value", value: Blob): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();

  const href = ref<string | null>(null);

  const styles = computed(() => ({ backgroundImage: `url(${href.value})` }));

  function submit(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files![0];

    emit("update:value", file);

    if (!href.value) {
      href.value = URL.createObjectURL(file);
      return;
    }

    URL.revokeObjectURL(href.value);
  }
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;

  label {
    display: block;
    text-align: center;

    cursor: pointer;

    border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px #0005 inset;

    border-radius: 2px;

    padding: 20px 20px;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: capitalize;

    background-size: cover;
    background-position: center center;
  }

  input {
    display: none;
  }
</style>
