<template>
  <div>
    <h1>config new</h1>
    <form @submit.prevent='submit'>
      <div>
        <label>name</label>
        <input type='text' v-model='config.name'>
      </div>
      <div>
        <button type='submit'>submit</button>
      </div>
    </form>
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
  methods: {
    async submit(e){
      const config = await Config.insert(this.config)
      this.$router.push(`/configs/${config._id}`)
    },
  },
}
</script>

<style scoped>
</style>
