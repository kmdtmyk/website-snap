<template>
  <div>
    <h1>{{snap.name}}</h1>
    <div class='ui grid'>
      <div class='five wide column'>
        <div class='ui vertical menu'>
          <a
            class='item'
            :class='{active: index === selectedIndex}'
            v-for='(log, index) in snapLogs'
            :key='index'
            @click='selectLog(index)'>
            {{log.datetime | datetime}}
            <div class='ui label'>
              {{log.files.length}}
            </div>
          </a>
        </div>
      </div>

      <div class='eleven wide column'>
        <div class='ui segment log-detail'>
          <img
           v-for='(files, index) in selectedLog.files'
           :key='index'
           :src='path.join(logDirectory, files.name)'
           width=100
           height=100>
        </div>
        <button-tag @click='remove(selectedIndex)'>remove</button-tag>
      </div>

    </div>
  </div>
</template>

<script>
import Snap from 'models/Snap'
import SnapLog from 'models/SnapLog'
import path from 'path'
import config from 'config'

export default{
  data(){
    return {
      snap: {},
      snapLogs: [],
      selectedIndex: 0,
    }
  },
  computed: {
    selectedLog(){
      if(!this.snapLogs[this.selectedIndex]){
        return {}
      }
      return this.snapLogs[this.selectedIndex]
    },
    logDirectory(){
      return path.join(config.logDirectory, this.selectedLog.directory)
    },
    path(){
      return path
    }
  },
  async beforeRouteEnter(route, redirect, next){
    const _id = route.params.id
    const snap = await Snap.findOne({_id})
    const snapLogs = await SnapLog.find({snapId: _id})
    next((vm) => {
      vm.snap = snap
      vm.snapLogs = snapLogs
    })
  },
  methods: {
    selectLog(index){
      this.selectedIndex = index
    },
    async remove(index){
      const _id = this.selectedLog._id
      await SnapLog.remove({_id})
      this.snapLogs = this.snapLogs.filter((snapLog) => {
        return snapLog._id !== _id
      })
    }
  },
}
</script>

<style scoped>
.ui.vertical.menu{
  width: auto;
}

.log-detail{
  height: 80vh;
}
</style>
