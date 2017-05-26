<template>
  <div>
    <h1>snap edit</h1>
    <form @submit.prevent='submit'>
      <div>
        <label>name</label>
        <input type='text' v-model='snap.name'>
      </div>
      <div>
        <button type='submit'>submit</button>
      </div>
    </form>
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
  },
  methods: {
    async submit(e){
      await Snap.update(this.snap)
      this.$router.push('./')
    },
  },
}
</script>

<style scoped>
</style>
