<template>
  <div class="input">
    <label
      class="input__label"
      :for="id"
      v-show="props.showLabel"
      :class="{ 'input__label--focus': focus || input.length }"
    >
      {{ props.label }}
    </label>
    <input
      :class="{ 'input__field--error': error }"
      class="input__field"
      :id="id"
      :type="type"
      ref="inputRef"
      :placeholder="placeholder"
      v-model.lazy="input"
      @blur="blur = true"
      @focus="focus = true"
      @focusout="focus = false"
    />
    <p class="input__error" v-if="error && blur">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, type VNodeRef } from "vue";

  interface Props {
    id: string;
    label?: string;
    showLabel?: boolean;
    type?: "text" | "password";
    required?: boolean;
    value: any;
    placeholder?: string;
    pattern?: RegExp;
    patternMessage?: string;
    labelClass?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    required: false,
    type: "text",
    label: "",
    placeholder: " ",
    showLabel: true,
  });

  interface Emit {
    (e: "update:value", value: any): void;
    (e: "valid", value: boolean): void;
  }
  const emit = defineEmits<Emit>();
  const error = ref("");
  const input = ref<string>(props.value);
  const inputRef = ref<null | VNodeRef>(null);
  const blur = ref<boolean>(false);
  const focus = ref<boolean>(false);

  watch(input, (newState) => {
    emit("update:value", newState);
    validate();
  });

  watch(input, () => {
    emit("valid", error.value === "");
  });

  function validate() {
    if (props.required && input.value.length === 0) {
      error.value = "Required";
      return;
    }

    if (props.pattern && !props.pattern.test(input.value)) {
      error.value = props.patternMessage ?? "No matches the pattern.";
      return;
    }

    error.value = "";
  }

  watch(error, (newError) => {
    if (!inputRef.value) return;
    inputRef.value.setCustomValidity(newError);
  });
</script>

<style lang="scss" scoped>
  @use "@/styles/components.scss" as *;
  @use "@/styles/colors.scss" as *;

  .input {
    display: flex;
    flex-flow: column nowrap;
    position: relative;

    &__label {
      position: absolute;
      top: 25px;
      left: 10px;
      transform: translateY(-50%);

      transition: 200ms;

      font-size: 0.85rem;

      text-transform: capitalize;

      color: #0005;

      &--focus {
        font-weight: 500;
        top: 12.5px;
        left: 10px;
      }
    }

    &__field {
      width: 100%;
      padding: 25px 10px 5px 10px;

      border: 1px solid rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 1px #0005 inset;

      border-radius: 2px;

      transition: 200ms;

      &--error {
        border-color: $red;
        margin-bottom: 15px;
      }

      &::placeholder {
        text-transform: capitalize;
      }

      &:not(:placeholder-shown):not(:invalid) {
        border: 1px solid #5fa53f;
      }
    }

    &__error {
      position: absolute;
      bottom: 0;
      margin-top: 2.5px;
      font-size: 0.8rem;
      color: $red;
    }
  }
</style>
