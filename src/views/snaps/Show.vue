<template>
  <div>
    <h1>{{snap.name}}</h1>

    <page-list v-model='snap.pages'></page-list>

    <div>
      <button-tag @click='run' :disabled='running'>
        Run
      </button-tag>
    </div>

    <tab-pane>
      <tab-labels>
        <tab-label data-tab='log'>log</tab-label>
        <tab-label data-tab='result'>result</tab-label>
      </tab-labels>
      <tab-item data-tab='log'>
        <div class='ui segment detail'>
          <snap-history-logs v-model='snapHistory'/>
        </div>
      </tab-item>
      <tab-item data-tab='result'>
        <div class='ui segment detail'>
          <snap-history-files v-model='snapHistory'/>
        </div>
      </tab-item>
    </tab-pane>

    <div>
      <router-link :to='`/snaps/${snap._id}/edit`'>edit</router-link>
      <router-link to='/snaps'>back</router-link>
    </div>
  </div>
</template>

<script>
import Snap from 'models/Snap'
import SnapHistory from 'models/SnapHistory'
import ScreenCapture from 'lib/ScreenCapture'
import PageList from './PageList'
import SnapHistoryLogs from './SnapHistory/Logs'
import SnapHistoryFiles from './SnapHistory/Files'

export default {
  components: {
    PageList,
    SnapHistoryLogs,
    SnapHistoryFiles,
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
      await SnapHistory.insert(snapHistory)
    }
  },
}
</script>

<style scoped>
.detail{
  height: 50vh;
  overflow-y: scroll;
}

.success{
  color: green;
}

.wait{
  color: blue;
}

.fail{
  color: red;
}
</style>
