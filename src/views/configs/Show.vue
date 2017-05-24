<template>
  <div>
    <h1>config show</h1>
    <div>
      <label>name</label>
      <span>{{config.name}}</span>
    </div>
    <router-link :to='`/configs/${config._id}/edit`'>edit</router-link>
    <router-link to='/configs'>back</router-link>
  </div>
</template>

<script>
import Config from 'models/Config'

export default{
  data(){
    return {
      config: {}
    }
  },
  async beforeCreate(){
    const _id = this.$route.params.id
    this.config = await Config.findOne({_id})
  }
}
</script>

<style scoped>
</style>
