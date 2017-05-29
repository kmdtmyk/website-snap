<template>
  <form class='ui form' @submit='submit'>
    <slot></slot>
  </form>
</template>

<script>
export default{
  methods: {
    submit(e){
      this.$emit('submit', e)
    },
  }
}
</script>

<style scoped>
</style>
