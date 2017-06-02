<template>
  <div>
    <h1>{{snap.name}}</h1>
    <table-tag>
      <thead>
        <tr>
          <th>name</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(snap, index) in snap.pages' :key='index'>
          <td>
            {{snap.name}}
          </td>
          <td>
            {{snap.url}}
          </td>
        </tr>
      </tbody>
    </table-tag>
    <div>
      <router-link :to='`/snaps/${snap._id}/edit`'>edit</router-link>
      <router-link to='/snaps'>back</router-link>
    </div>
  </div>
</template>

<script>
import Snap from 'models/Snap'

export default{
  data(){
    return {
      snap: {}
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
