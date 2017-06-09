<template>
  <div>

    <div class='ui secondary pointing menu'>
      <link-tag :to='`/snaps/${snap._id}`' class='item'>
        Config
      </link-tag>
      <link-tag :to='`/snaps/${snap._id}/run`' class='item'>
        Run
      </link-tag>
      <link-tag :to='`/snaps/${snap._id}/history`' class='item'>
        History
      </link-tag>
    </div>

    <router-view></router-view>

    <divider-tag/>

    <div>
      <router-link :to='`/snaps/${snap._id}/edit`'>edit</router-link>
      <router-link to='/snaps'>back</router-link>
    </div>
  </div>
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
