<template>
  <label class="label">
    <span class="label__text">{{ label }}</span>
    <input
      class="label__input"
      :value="value"
      :type="type"
      :required="required"
      @input="$emit('update:value', $event.target.value)"
    />
  </label>
</template>

<script>
  export default {
    props: {
      label: String,
      type: String,
      required: Boolean,
      placeholder: String,
      value: {
        type: String,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .label {
    display: flex;
    flex-flow: column nowrap;

    &__input {
      background-color: #333;
      height: 40px;

      border-radius: 5px;

      &:hover {
        background-color: #454545;
      }
    }
  }
</style>
