<template>
  <div>
    <h1>snap edit</h1>
    <snap-form v-model='snap' @submit='submit'></snap-form>
    <router-link to='/snaps'>back</router-link>
  </div>
</template>

<script>
import Snap from 'models/Snap'
import SnapForm from './SnapForm'

export default{
  components: {
    SnapForm
  },
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
