<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid">个人资料</div>
    <div class="iconfont right">&#xe61f;</div>
  </div>
</template>
<script>
export default {
  name: 'UserHeader',
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
    line-height: $height
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
      float: left
    .right
      float: right
      padding-right: $pl
</style>
