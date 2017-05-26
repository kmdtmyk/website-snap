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
  async beforeCreate(){
    const _id = this.$route.params.id
    this.snap = await Snap.findOne({_id})
  }
}
</script>

<style scoped>
</style>
