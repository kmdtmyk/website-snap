<template>
  <link-tag class='ui button' :to='to'>
    <slot></slot>
  </link-tag>
</template>

<script>
export default{
  props: ['to']
}
</script>

<style scoped>
</style>
