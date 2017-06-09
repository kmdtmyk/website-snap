<template>
  <div class='file-list'>
    <div v-for='(file, index) in snapHistory.files' :key='index' class='file-item'>
      <img :src='path.join(directory, file.name)' width=100 height=100>
       <div class='file-name'>
         {{file.name}}
       </div>
     </div>
  </div>
</template>

<script>
import path from 'path'
import config from 'config'

export default{
  model: {
    prop: 'snapHistory',
  },
  props: [
    'snapHistory'
  ],
  computed: {
    directory(){
      return path.join(config.logDirectory, this.snapHistory.directory)
    },
    path(){
      return path
    },
  }
}
</script>

<style scoped>
.file-list{
  display: flex;
}

.file-item{
  margin: 5px;
}
</style>
