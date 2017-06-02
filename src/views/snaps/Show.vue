<template>
  <div>
    <h1>{{snap.name}}</h1>
    <table-tag>
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
        {{captureLog}}
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
import ScreenCapture from 'lib/ScreenCapture'

const screenCapture = new ScreenCapture()

export default{
  data(){
    return {
      snap: {},
      captureLogs: [],
      running: false,
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
      const pages = this.snap.pages
      this.captureLogs = []
      for(let i = 0; i < pages.length; i++){
        const {url} = pages[i]
        this.captureLogs.push(`[wait] ${url}`)
        const {status, filepath} = await screenCapture.take(url)
        this.captureLogs.pop()
        this.captureLogs.push(`[${status}] ${url}`)
      }
      this.captureLogs.push('finished.')
      this.running = false
    },
  },
}
</script>

<style scoped>
.capture-log{
  height: 50vh;
  overflow-y: scroll;
}
</style>
