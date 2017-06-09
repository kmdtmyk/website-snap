<template>
  <div>
    <div v-for='(log, index) in snapHistory.logs' :key='index'>
      <span :class='log.status'>[{{log.status}}]</span>
      <span>{{log.url}}</span>
    </div>
    <div v-if='snapHistory.end'>
      finished.
    </div>
  </div>
</template>

<script>
export default{
  model: {
    prop: 'snapHistory',
  },
  props: [
    'snapHistory'
  ],
}
</script>

<style scoped>
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
