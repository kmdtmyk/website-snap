<template>
  <form-tag @submit.prevent='submit'>
    <field-tag>
      <label>name</label>
      <text-field type='text' v-model='snap.name'/>
    </field-tag>
    <page-list v-model='snap.pages'></page-list>
    <div>
      <submit-button>Register</submit-button>
      <button-tag @click='cancel'>Cancel</button-tag>
    </div>
  </form-tag>
</template>

<script>
import PageList from './PageList'

export default{
  components: {
    PageList,
  },
  model: {
    prop: 'snap'
  },
  props: ['snap'],
  methods: {
    submit(e){
      this.$emit('submit', e)
    },
    cancel(e){
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
</style>
