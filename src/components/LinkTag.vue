<template>
  <router-link :to='to' exact>
    <slot></slot>
  </router-link>
</template>

<script>
export default{
  props: ['to']
}
</script>

<style scoped>
</style>
