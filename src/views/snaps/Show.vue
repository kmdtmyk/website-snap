<template>
  <div>
    <h1>snap show</h1>
    <div>
      <label>name</label>
      <span>{{snap.name}}</span>
    </div>
    <router-link :to='`/snaps/${snap._id}/edit`'>edit</router-link>
    <router-link to='/snaps'>back</router-link>
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
