<template>
  <div class='ui grid'>

    <div class='five wide column'>
      <div class='ui vertical menu'>
        <a
          class='item'
          :class='{active: index === selectedIndex}'
          v-for='(snapHistory, index) in snapHistories'
          :key='index'
          @click='selectLog(index)'>
          {{snapHistory.start | datetime}}
          <div class='ui label'>
            {{snapHistory.files.length}}
          </div>
        </a>
      </div>
    </div>

    <div class='eleven wide column'>
      <div class='ui segment log-detail'>
         <snap-history-files v-model='selectedSnapHistory'/>
      </div>
      <button-tag @click='remove(selectedIndex)'>remove</button-tag>
    </div>

  </div>
</template>

<script>
import Snap from 'models/Snap'
import SnapHistory from 'models/SnapHistory'
import path from 'path'
import config from 'config'
import SnapHistoryFiles from './SnapHistory/Files'

export default {
  components: {
    SnapHistoryFiles,
  },
  data(){
    return {
      snap: {},
      snapHistories: [],
      selectedIndex: 0,
    }
  },
  computed: {
    selectedSnapHistory(){
      if(!this.snapHistories[this.selectedIndex]){
        return {}
      }
      return this.snapHistories[this.selectedIndex]
    },
    logDirectory(){
      return path.join(config.logDirectory, this.selectedSnapHistory.directory)
    },
    path(){
      return path
    }
  },
  async beforeRouteEnter(route, redirect, next){
    const _id = route.params.id
    const snap = await Snap.findOne({_id})
    const snapHistories = await SnapHistory.find({snapId: _id})
    next((vm) => {
      vm.snap = snap
      vm.snapHistories = snapHistories
    })
  },
  methods: {
    selectLog(index){
      this.selectedIndex = index
    },
    async remove(index){
      const _id = this.selectedSnapHistory._id
      await SnapHistory.remove({_id})
      this.snapHistories = this.snapHistories.filter((snapLog) => {
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

.ui.menu .item{
  padding: 8px;
}

.log-detail{
  height: 70vh;
}
</style>
