<template>
  <div class="input">
    <img class="input__image" :src="fileHref" v-if="fileHref" />
    <img
      class="input__image"
      src="@/assets/default-profile-picture.png"
      v-else
    />
    <label
      class="input__label"
      :class="{ 'input__label--show': fileHref === null }"
      :for="props.id"
    >
      <span class="input__label-text">
        {{ label }}
      </span>
    </label>
    <input
      class="input__field"
      type="file"
      @change="handleInput($event)"
      accept="image/png, image/jpeg, image/webp, image/gif"
      :name="props.id"
      :id="props.id"
      :required="required"
    />
  </div>
</template>

<script lang="ts" setup>
  import { shallowRef, watch, onUnmounted, ref } from "vue";

  interface Props {
    label: string;
    required?: boolean;
    id: string;
  }

  interface Emit {
    (e: "update:value", value: Blob): void;
    (e: "valid", value: boolean): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();

  const file = shallowRef<Blob | null>(null);
  const fileHref = ref<string | null>(null);

  function handleInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const userPicture = input.files![0];

    file.value = userPicture;
  }

  watch(file, (newBlob) => {
    if (newBlob === null) return;
    try {
      if (fileHref.value) URL.revokeObjectURL(fileHref.value);
      fileHref.value = URL.createObjectURL(newBlob);
      emit("update:value", newBlob);
      emit("valid", true);
    } catch (e) {
      emit("valid", false);
    }
  });

  onUnmounted(() => {
    if (fileHref.value) URL.revokeObjectURL(fileHref.value);
  });
</script>

<style lang="scss" scoped>
  @use "@/styles/colors.scss" as *;
  @use "@/styles/components.scss" as *;

  .input {
    border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px #0005 inset;
    border-radius: 2px;

    position: relative;

    min-height: 250px;
    height: calc(250px + 5vw);

    display: flex;

    &__label {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      background-color: rgba(0, 0, 0, 0.15);

      transition: 200ms;

      &--show {
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }

    &__label-text {
      @include button($padding: 20px);
      font-size: 0.8rem;
      cursor: pointer;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__field {
      display: none;
    }
  }
</style>
