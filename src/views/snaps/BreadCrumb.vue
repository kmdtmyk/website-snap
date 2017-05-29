<template>
  <div>
    <div class='ui breadcrumb'>
      <span v-for='(match, index) in matches' :key='index'>
        <span v-if='index < matches.length - 1'>
          <link-tag class='section' :to='match.path'>
            {{match.meta.breadcrumb}}
          </link-tag>
          <i class='right angle icon divider'></i>
        </span>
        <span v-else>
          <div class='section active' :to='match.path'>
            {{match.meta.breadcrumb}}
          </div>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default{
  computed: {
    matches(){
      const matches = this.$route.matched
      return matches.filter((match) => {
        return !!match.meta.breadcrumb
      })
    }
  },
}
</script>

<style scoped>
</style>
