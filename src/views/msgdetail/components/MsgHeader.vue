<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid" v-text="$route.query.name ? $route.query.name :'未命名群聊'">玲珑</div>
    <div class="iconfont right">&#xe643;</div>
  </div>
</template>
<script>
export default {
  name: 'MsgHeader',
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    height: .8rem
    align-items: center
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    display: flex
    font-size: .5rem
    .mid
      flex: 1
    .left
      padding-left: $pl
      width: .7rem
    .right
      width: .7rem
      padding-right: $pl
</style>
