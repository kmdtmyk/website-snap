<template>
  <div>
    <h1>snap new</h1>
    <snap-form v-model='snap' @submit='submit'></snap-form>
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
      snap: {
        name: ''
      }
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
