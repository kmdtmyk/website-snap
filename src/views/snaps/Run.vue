<template>
  <div>
    <snap-history-view v-model='snapHistory'/>
    <div>
      <button-tag @click='run' :disabled='running'>
        Run
      </button-tag>
    </div>
  </div>
</template>

<script>
import Snap from 'models/Snap'
import SnapHistory from 'models/SnapHistory'
import ScreenCapture from 'lib/ScreenCapture'
import SnapHistoryView from './SnapHistory'

export default {
  components: {
    SnapHistoryView,
  },
  data(){
    return {
      snap: {},
      snapHistory: {},
    }
  },
  computed: {
    running(){
      const {start, end} = this.snapHistory
      return start !== null && end === null
    },
  },
  async beforeRouteEnter(route, redirect, next){
    const _id = route.params.id
    const snap = await Snap.findOne({_id})
    const snapHistory = SnapHistory.new(_id)
    next((vm) => {
      vm.snap = snap
      vm.snapHistory = snapHistory
    })
  },
  methods: {
    async run(){
      const snapHistory = SnapHistory.new(this.snap._id)
      this.snapHistory = snapHistory
      snapHistory.start = new Date()
      await this.take(this.snap.pages)
      snapHistory.end = new Date()
      await SnapHistory.insert(snapHistory)
    },
    async take(pages){
      const screenCapture = new ScreenCapture()
      const {snapHistory} = this
      const {logs, files} = snapHistory
      snapHistory.directory = screenCapture.directory
      for(let i = 0; i < pages.length; i++){
        const {url} = pages[i]
        logs.push({
          status: 'wait',
          url,
        })
        const {status, success, name} = await screenCapture.take(url)
        logs.pop()
        logs.push({
          status,
          url,
        })
        if(success === true){
          files.push({name})
        }
      }
    }
  },
}
</script>

<style scoped>
</style>
