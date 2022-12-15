<template>
  <div>
    <label :for="props.id">{{ label }}</label>
    <input :id="props.id" />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    id: string;
    label: string;
  }
  const props = defineProps<Props>();
</script>

<style scoped></style>
