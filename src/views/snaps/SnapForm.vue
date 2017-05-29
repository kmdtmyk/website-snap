<template>
  <form @submit.prevent='submit'>
    <div>
      <label>name</label>
      <input type='text' v-model='snap.name'>
    </div>
    <div>
      <button type='submit'>submit</button>
    </div>
  </form>
</template>

<script>
export default{
  model: {
    prop: 'snap'
  },
  props: ['snap'],
  methods: {
    submit(e){
      this.$emit('submit', e)
    },
  },
}
</script>

<style scoped>
</style>
