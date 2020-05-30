<template>
  <div class="header">
    <div class="left" @click="handleBack">取消</div>
    <div class="mid">修改密码</div>
    <div class="right" @click="handleSend">完成</div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'PasswordHeader',
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    handleSend () {
      Bus.$emit('submitpassword')
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
    font-size: $btnfz
    .mid
      flex: 1
      font-size: $fz
    .left
      padding-left: $pl
      width: .7rem
    .right
      width: .7rem
      padding-right: $pl
</style>
