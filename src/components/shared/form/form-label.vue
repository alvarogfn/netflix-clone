<template>
  <div>
    <label :for="props.id">{{ props.label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    label: string;
    id: string;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
