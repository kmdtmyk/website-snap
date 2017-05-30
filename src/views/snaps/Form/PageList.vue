<template>
  <table-tag>
    <thead>
      <tr>
        <th>name</th>
        <th>url</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(record, index) in records' :key='index'>
        <td>
          <text-field v-model='record.name' @input='input(record, index)'></text-field>
        </td>
        <td>
          <text-field v-model='record.url' @input='input(record, index)'></text-field>
        </td>
        <td>
          <button-tag v-if='index < records.length - 1' @click='duplicate(index)'>duplicate</button-tag>
          <button-tag v-if='index < records.length - 1' @click='remove(index)'>remove</button-tag>
        </td>
      </tr>
    </tbody>
  </table-tag>
</template>

<script>
export default{
  model: {
    prop: 'value',
  },
  props: ['value'],
  computed: {
    records(){
      return [...this.value, {}]
    }
  },
  methods: {
    input(record, index){
      const records = [...this.value]
      records[index] = record
      this.$emit('input', records)
    },
    duplicate(index){
      const records = [...this.value]
      this.$emit('input', [...records.slice(0, index), {...records[index]}, ...records.slice(index)])
    },
    remove(index){
      const records = [...this.value]
      this.$emit('input', [...records.slice(0, index), ...records.slice(index + 1)])
    }
  }
}
</script>

<style scoped>
</style>
