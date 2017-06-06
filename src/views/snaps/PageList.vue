<template>
  <table-tag class='striped'>
    <thead>
      <tr>
        <th>name</th>
        <th>url</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(page, index) in pages' :key='index'>
        <td>
          {{page.name}}
        </td>
        <td>
          {{page.url}}
        </td>
      </tr>
    </tbody>
  </table-tag>
</template>

<script>
export default{
  model: {
    prop: 'pages',
  },
  props: [
    'pages'
  ],
}
</script>

<style scoped>
</style>
