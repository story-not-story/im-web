<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">取消</div>
    <div class="mid">
      <slot>加好友</slot>
    </div>
    <div class="iconfont right" @click="handleSend">发送</div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'ApplyHeader',
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    handleSend () {
      Bus.$emit('submitapply')
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
