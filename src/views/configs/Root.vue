<template>
  <div>
    <bread-crumb></bread-crumb>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from './BreadCrumb'

export default{
  components: {
    BreadCrumb
  },
}
</script>

<style scoped>
</style>
