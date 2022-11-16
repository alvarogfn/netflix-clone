<template>
  <label for="">
    <input
      type="file"
      @change="$emit('update:value', $event.target.files[0])"
      accept="image/png, image/jpeg"
      name="avatar"
    />
  </label>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped></style>
