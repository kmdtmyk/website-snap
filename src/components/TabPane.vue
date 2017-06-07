<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted(){
    $('.menu .item').tab()
    const items = this.$el.querySelectorAll('.item')
    items[0].click()
  },
}
</script>

<style scoped>
</style>
