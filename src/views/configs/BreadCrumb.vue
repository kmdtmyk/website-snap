<template>
  <div>
    <div class='ui breadcrumb'>
      <span v-for='(matched, index) in $route.matched' :key='index'>
        <span v-if='index < $route.matched.length - 1'>
          <router-link class='section' :to='matched.path'>
            {{matched.meta.breadcrumb}}
          </router-link>
          <i class='right angle icon divider'></i>
        </span>
        <span v-else>
          <div class='section active' :to='matched.path'>
            {{matched.meta.breadcrumb}}
          </div>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default{
}
</script>

<style scoped>
</style>
