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

    <div class='ui segment capture-log'>
      <div v-for='(captureLog, index) in captureLogs' :key='index'>
        <span :class='captureLog.status'>[{{captureLog.status}}]</span>
        <span>{{captureLog.url}}</span>
      </div>
      <div v-if='finished'>
        finished.
      </div>
    </div>

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

export default{
  data(){
    return {
      snap: {},
      captureLogs: [],
      running: false,
      finished: false,
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
    async run(){
      this.running = true
      this.finished = false
      await this.take()
      this.running = false
      this.finished = true
    },
    async take(){
      const screenCapture = new ScreenCapture()
      const pages = this.snap.pages
      const files = []
      this.captureLogs = []
      for(let i = 0; i < pages.length; i++){
        const {url} = pages[i]
        this.captureLogs.push({
          status: 'wait',
          url,
        })
        const {status, success, name} = await screenCapture.take(url)
        this.captureLogs.pop()
        this.captureLogs.push({
          status,
          url,
        })
        files.push({name})
      }
      const datetime = screenCapture.datetime
      const directory = screenCapture.directory
      const _id = this.$route.params.id
      const log = {
        snapId: _id,
        datetime,
        directory,
        files,
      }
      await SnapHistory.insert(log)
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
