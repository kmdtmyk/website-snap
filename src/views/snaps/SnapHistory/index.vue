<template>
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
</template>

<script>
import SnapHistoryLogs from './Logs'
import SnapHistoryFiles from './Files'

export default {
  components: {
    SnapHistoryLogs,
    SnapHistoryFiles,
  },
  model: {
    prop: 'snapHistory',
  },
  props: [
    'snapHistory'
  ],
}
</script>

<style scoped>
.detail{
  height: 50vh;
  overflow-y: scroll;
}
</style>
