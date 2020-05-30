<template>
  <div class="header">
    我的资料
    <div class="iconfont right" @click="logout">&#xe605;</div>
  </div>
</template>
<script>
export default {
  name: 'MeHeader',
  methods: {
    logout () {
      this.$axios.get('/logout')
      this.$router.push('/login')
      if (this.$ws.websocket) {
        this.$ws.websocket.close()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    height: $height
    line-height: $height
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    position: relative
    font-size: $fz
    .right
      position: absolute
      top: 0
      right: .2rem
      bottom: 0
      line-height: $height
</style>
