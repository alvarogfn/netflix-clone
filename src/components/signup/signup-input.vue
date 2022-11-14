<template>
  <label class="input">
    <span class="input__label">{{ label }}</span>
    <input
      :value="value"
      class="input__value"
      @input="$emit('update:value', $event.target.value)"
    />
  </label>
</template>

<script>
  export default {
    props: {
      label: String,
      value: String,
    },
  };
</script>

<style lang="scss" scoped>
  .input {
    display: flex;
    flex-flow: column nowrap;
    &__value {
      border: 1px solid black;
    }
  }
</style>
