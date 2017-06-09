<template>
  <div class='tab-pane'>
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
.tab-pane{
  margin-bottom: 1em;
}
</style>
