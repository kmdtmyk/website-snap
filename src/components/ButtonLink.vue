<template>
  <router-link class='ui button' :to='to' exact>
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
