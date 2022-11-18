<template>
  <label class="label">
    <span class="label__text">{{ label }}</span>
    <input
      class="label__input"
      :value="value"
      :type="type"
      :placeholder="placeholder"
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

      border-radius: 5px;

      padding: 15px 18px;

      &:hover {
        background-color: #454545;
      }

      &::placeholder {
        text-transform: capitalize;
        font-size: 0.8rem;
      }
    }
  }

  @media screen and (min-width: 740px) {
    .label {
      &__input {
        &::placeholder {
          font-size: 1rem;
        }
      }
    }
  }
</style>
