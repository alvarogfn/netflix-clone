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
  import type { PatternType as PatternTypeProp } from "@/utils/Patterns";
  import { ref, watch, type VNodeRef } from "vue";

  interface Props {
    id: string;
    label?: string;
    showLabel?: boolean;
    type?: "text" | "password";
    required?: boolean;
    value: any;
    placeholder?: string;
    patterns?: PatternTypeProp[];
  }

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    type: "text",
    label: "",
    placeholder: " ",
    showLabel: true,
    patterns: () => [],
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

  watch(focus, (newState, oldState) => {
    if (oldState && !newState) validate();
    emit("valid", error.value === "");
  });

  function validate() {
    error.value = "";
    const value = input.value;
    if (props.required && value.length === 0) {
      error.value = "Required.";
      return;
    }

    props.patterns.forEach((pattern) => {
      if (pattern.type === "length") {
        if (
          pattern.minLength > value.length ||
          pattern.maxLength < value.length
        )
          error.value = pattern.message;
      }
      if (pattern.type === "mask") {
        if (!pattern.mask.test(value)) {
          error.value = pattern.message;
        }
      }
    });
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
      top: 50%;
      left: 10px;
      transform: translateY(-50%);

      transition: 200ms;

      font-size: 0.85rem;

      &--focus {
        top: 12.5px;
        left: 10px;
      }
    }

    &__field {
      width: 100%;
      padding: 25px 10px 5px 10px;
      transition: 200ms;
    }

    &__error {
      position: absolute;
      bottom: -15.5px;
    }
  }
</style>
