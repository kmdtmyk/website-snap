<template>
  <div>
    <h1>config edit</h1>
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
  async beforeCreate(){
    const _id = this.$route.params.id
    this.config = await Config.findOne({_id})
  },
  methods: {
    async submit(e){
      await Config.update(this.config)
      this.$router.push('./')
    },
  },
}
</script>

<style scoped>
</style>
