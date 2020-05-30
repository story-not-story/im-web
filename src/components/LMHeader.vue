<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid">
      <slot>聊天设置</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LMHeader',
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
    height: $height
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    font-size: .5rem
    position: relative
    line-height: $height
    .left
      position: absolute
      left: 0
      top: 0
      bottom: 0
      padding-left: $pl
      width: .7rem
</style>
