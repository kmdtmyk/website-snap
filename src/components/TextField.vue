<template>
  <input type='text' v-model='text' @change='change' @input='input'>
</template>

<script>
export default{
  props: {
    value: {
      type: String
    },
  },
  computed: {
    text(){
      return this.value
    }
  },
  methods: {
    input(e){
      const value = e.target.value
      this.$emit('input', value)
    },
    change(e){
      this.$emit('change', e)
    },
  }
}
</script>

<style scoped>
</style>
