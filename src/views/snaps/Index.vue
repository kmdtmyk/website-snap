<template>
  <div>
    <h1>snap index</h1>
    <table-tag>
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
            <router-link :to='`/snaps/${snap._id}`'>show</router-link>
            <router-link :to='`/snaps/${snap._id}/edit`'>edit</router-link>
            <a href='javascript:void(0)' @click='remove(index)'>delete</a>
          </td>
        </tr>
      </tbody>
    </table-tag>
    <router-link to='/snaps/new'>new snap</router-link>
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
  async beforeCreate(){
    this.snaps = await Snap.find()
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
