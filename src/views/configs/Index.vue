<template>
  <div>
    <h1>config index</h1>
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(config, index) in configs' :key='index'>
          <td>{{config.name}}{{config.delete}}</td>
          <td>
            <router-link :to='`/configs/${config._id}`'>show</router-link>
            <router-link :to='`/configs/${config._id}/edit`'>edit</router-link>
            <a href='javascript:void(0)' @click='remove(index)'>delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to='/configs/new'>new config</router-link>
  </div>
</template>

<script>
import Config from 'models/Config'

export default{
  data(){
    return {
      configs: []
    }
  },
  async beforeCreate(){
    this.configs = await Config.find()
  },
  methods: {
    async remove(index){
      if(confirm('Are you sure?') === false){
        return
      }
      await Config.remove(this.configs[index])
      this.configs.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.delete{
  color: gray;
}
</style>
