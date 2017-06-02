<template>
  <i class='fa' :class='`fa-${icon}`' aria-hidden='true'>
    <slot></slot>
  </i>
</template>

<script>
export default {
  props: [
    'icon'
  ]
}
</script>

<style scoped>
</style>
