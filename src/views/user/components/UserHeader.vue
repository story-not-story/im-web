<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid">
      <slot>个人资料</slot>
    </div>
    <div class="iconfont right" @click="toSetting" v-show="isFriend">&#xe61f;</div>
  </div>
</template>
<script>
export default {
  name: 'UserHeader',
  props: {
    isFriend: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    toSetting () {
      let userId = this.$store.state.userId
      if (this.$route.query.userId) {
        userId = this.$route.query.userId
      }
      this.$router.push({ path: '/setting/user', query: { otherId: userId } })
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
    font-size: $fz
    position: relative
    .left
      position: absolute
      left: 0
      top: 0
      bottom: 0
      padding-left: $pl
      width: .7rem
    .right
      position: absolute
      right: 0
      top: 0
      bottom: 0
      width: .7rem
      padding-right: $pl
</style>
