<template>
  <div class="header">
    <slot>发起群聊</slot>
    <div class="iconfont right" @click="back">&#xe622;</div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
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
      left: .2rem
      bottom: 0
      line-height: $height
</style>
