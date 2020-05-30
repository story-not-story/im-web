<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid">
      <slot>发起群聊</slot>
    </div>
    <div class="right" @click="handleCreate">创建</div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'CreateGroupHeader',
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    handleCreate () {
      Bus.$emit('create-group')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    height: $height
    align-items: center
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    display: flex
    .mid
      flex: 1
      font-size: .5rem
    .left
      padding-left: $pl
      width: .7rem
    .right
      width: .7rem
      padding-right: $pl
      font-size: $btnfz
</style>
