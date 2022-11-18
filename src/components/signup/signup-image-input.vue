<template>
  <label for="avatar" :style="styles">
    <span>{{ label }}</span>
    <input
      type="file"
      @change="loadImage"
      accept="image/png, image/jpeg, image/webp, image/gif"
      name="avatar"
      id="avatar"
      :required="required"
    />
  </label>
</template>

<script>
  export default {
    props: {
      label: String,
      required: Boolean,
    },
    data: () => ({
      href: "",
    }),
    computed: {
      styles() {
        return { backgroundImage: `url(${this.href})` };
      },
    },
    methods: {
      loadImage($event) {
        if (typeof this.href === "string") {
          URL.revokeObjectURL(this.image);
        }

        const file = $event.target.files[0];
        this.$emit("update:value", file);

        this.href = URL.createObjectURL(file);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use "../../styles/colors.scss" as *;

  label {
    display: block;
    text-align: center;

    cursor: pointer;

    border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px #0005 inset;

    border-radius: 2px;

    padding: 20px 20px;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: capitalize;

    background-size: cover;
    background-position: center center;
  }

  input {
    display: none;
  }
</style>
