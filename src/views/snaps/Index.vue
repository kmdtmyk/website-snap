<template>
  <div>
    <h1>snap index</h1>
    <table-tag class='striped'>
      <thead>
        <tr>
          <th>name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(snap, index) in snaps' :key='index'>
          <td>{{snap.name}}{{snap.delete}}</td>
          <td>
            <link-tag :to='`/snaps/${snap._id}`'>show</link-tag>
            <link-tag :to='`/snaps/${snap._id}/edit`'>edit</link-tag>
            <a href='javascript:void(0)' @click='remove(index)'>delete</a>
          </td>
        </tr>
      </tbody>
    </table-tag>
    <link-tag to='/snaps/new'>new snap</link-tag>
  </div>
</template>

<script>
import Snap from 'models/Snap'

export default{
  data(){
    return {
      snaps: []
    }
  },
  async beforeRouteEnter(route, redirect, next){
    const snap = await Snap.find()
    next((vm) => {
      vm.snaps = snap
    })
  },
  methods: {
    async remove(index){
      if(confirm('Are you sure?') === false){
        return
      }
      await Snap.remove(this.snaps[index])
      this.snaps.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.delete{
  color: gray;
}
</style>
