<template>
  <table-tag class='striped'>
    <thead>
      <tr>
        <th>name</th>
        <th>url</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(page, index) in snap.pages' :key='index'>
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
import Snap from 'models/Snap'

export default {
  data(){
    return {
      snap: {},
    }
  },
  async beforeRouteEnter(route, redirect, next){
    const _id = route.params.id
    const snap = await Snap.findOne({_id})
    next((vm) => {
      vm.snap = snap
    })
  },
}
</script>

<style scoped>
</style>
