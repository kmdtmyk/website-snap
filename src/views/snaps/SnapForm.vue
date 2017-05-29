<template>
  <form-tag @submit.prevent='submit'>
    <field-tag>
      <label>name</label>
      <text-field type='text' v-model='snap.name'/>
    </field-tag>
    <div>
      <submit-button>Register</submit-button>
      <button-link :to='{name: "snaps"}'>Cancel</button-link>
    </div>
  </form-tag>
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
