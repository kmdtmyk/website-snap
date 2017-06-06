<template>
  <div>
    <h1>{{snap.name}}</h1>
    <table-tag class='striped'>
      <thead>
        <tr>
          <th>name</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(snap, index) in snap.pages' :key='index'>
          <td>
            {{snap.name}}
          </td>
          <td>
            {{snap.url}}
          </td>
        </tr>
      </tbody>
    </table-tag>
    <div>
      <button-tag @click='run' :disabled='running'>
        Run
      </button-tag>
    </div>

    <snap-history-show v-model='snapHistory'/>

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
import SnapHistoryShow from './SnapHistoryShow'

export default {
  components: {
    SnapHistoryShow,
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
      snapHistory.directory = screenCapture.directory
      await SnapHistory.insert(snapHistory)
    }
  },
}
</script>

<style scoped>
.capture-log{
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
