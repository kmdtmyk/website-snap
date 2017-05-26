<template>
  <div>
    <h1>snap new</h1>
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
  methods: {
    async submit(e){
      const snap = await Snap.insert(this.snap)
      this.$router.push(`/snaps/${snap._id}`)
    },
  },
}
</script>

<style scoped>
</style>
