<template>
  <transition name="appear">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  interface Props {
    horizontal?: number;
    vertical?: number;
    transition?: {
      duration?: number;
      mode?: string;
    };
  }

  const props = withDefaults(defineProps<Props>(), {
    horizontal: -150,
    vertical: 0,
    transition: () => ({
      duration: 200,
      mode: "ease-in-out",
    }),
  });

  const horizontal = computed(() => props.horizontal + "px");
  const vertical = computed(() => props.vertical + "px");
  const transition = computed(
    () => `all ${props.transition.duration}ms ${props.transition.mode}`
  );
</script>

<style lang="scss" scoped>
  .appear {
    &-enter {
      &-active {
        transition: v-bind("transition");
      }
      &-from {
        transform: translateX(v-bind("horizontal"))
          translateY(v-bind("vertical"));
        opacity: 0;
      }
      &-to {
        transform: translateX(0px);
        opacity: 1;
      }
    }
    &-leave {
      &-active {
        transition: v-bind("transition");
      }
      &-from {
        transform: translateX(0px);
        opacity: 1;
      }
      &-to {
        transform: translateX(v-bind("horizontal"))
          translateY(v-bind("vertical"));
        opacity: 0;
      }
    }
  }
</style>
