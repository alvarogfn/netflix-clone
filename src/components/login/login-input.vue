<template>
  <label class="label">
    <span class="label__text">{{ label }}</span>
    <input
      class="label__input"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      @input="emit('update:value', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<script lang="ts" setup>
  interface Props {
    label: string;
    type: string;
    required: boolean;
    placeholder: string;
    value: string;
  }

  interface Emit {
    (e: "update:value", value: string): void;
  }

  defineProps<Props>();

  const emit = defineEmits<Emit>();
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
