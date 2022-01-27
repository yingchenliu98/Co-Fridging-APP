<template>
  <div class="dropdown-container">
    <div class="dropdown-btn">
      <slot name="dropdown-btn"></slot>
    </div>
    <div class="dropdown-content">
      <slot name="item-1"></slot>
      <slot name="item-2"></slot>
      <slot name="item-3"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
};
</script>

<style scoped></style>
