<template>
  <label class="input">
    <input
      :value="value"
      :placeholder="label"
      :required="required"
      :type="type"
      class="input__value"
      @input="$emit('update:value', $event.target.value)"
    />
  </label>
</template>

<script setup lang="ts">
  interface Props {
    label: string;
    value: string;
    type: string;
    required: boolean;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .input {
    display: flex;
    flex-flow: column nowrap;
    font-size: 0.9rem;

    &__value {
      padding: 15px 10px;

      border: 1px solid rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 1px #0005 inset;

      border-radius: 2px;

      &::placeholder {
        text-transform: capitalize;
      }
    }
  }
</style>
