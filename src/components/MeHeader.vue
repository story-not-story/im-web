<template>
  <div class="header">
    我的资料
    <div class="iconfont right">&#xe61f;</div>
  </div>
</template>
<script>
export default {
  name: 'MeHeader'
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    height: .8rem
    line-height: $height
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    position: relative
    font-size: .5rem
    .right
      position: absolute
      top: 0
      right: .2rem
      bottom: 0
      line-height: $height
</style>
