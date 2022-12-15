<template>
  <form-label :id="props.id" :label="props.label">
    <input />
  </form-label>
</template>

<script setup lang="ts">
  import FormLabel from "./form-label.vue";

  interface Props {
    label: string;
    id: string;
    value: string;
  }

  interface Emit {
    (e: "update:value", value: string): void;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<Emit>();
</script>

<style scoped></style>
