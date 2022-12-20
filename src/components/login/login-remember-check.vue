<template>
  <div class="check">
    <input
      class="check__input"
      type="checkbox"
      id="remember"
      name="remember"
      :checked="props.value"
      @input="emit('update:value', ($event.target as HTMLInputElement).checked)"
    />
    <label class="check__label" for="remember">
      <div
        class="check__label-box"
        :class="{ 'check__label-box--checked': props.value }"
      ></div>
      <span class="check__label-text">Remember me</span>
    </label>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    value: boolean;
  }

  interface Emit {
    (e: "update:value", value: any): void;
  }

  const emit = defineEmits<Emit>();
  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .check {
    display: flex;

    &__label {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      column-gap: 5px;
      cursor: pointer;
    }

    &__label-box {
      width: 20px;
      height: 20px;
      border-radius: 2.5px;
      background-color: #868686;
      &--checked {
        background-image: url("../../assets/check.png");
        background-repeat: no-repeat;
        background-size: 15px 15px;
        background-position: center center;
      }
    }

    &__label-text {
      color: #868686;
      font-size: 0.8rem;
    }

    &__input {
      display: none;
    }
  }
</style>
