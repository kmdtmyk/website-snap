<template>
  <div>
    <h1>snap edit</h1>
    <snap-form v-model='snap' @submit='submit'></snap-form>
  </div>
</template>

<script>
import Snap from 'models/Snap'
import SnapForm from './Form'

export default{
  components: {
    SnapForm
  },
  data(){
    const snap = Snap.new()
    return {
      snap
    }
  },
  async beforeRouteEnter(route, redirect, next){
    const _id = route.params.id
    const snap = await Snap.findOne({_id})
    next((vm) => {
      vm.snap = snap
    })
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
