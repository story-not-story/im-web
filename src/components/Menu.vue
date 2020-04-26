<template>
  <div class="menu">
    <router-link to="/relation">
      <div class="myicon">
        <div :class="flag('/relation')">好友</div>
      </div>
    </router-link>
    <router-link to="/relation/label">
      <div class="myicon">
        <div :class="flag('/relation/label')">分组</div>
      </div>
    </router-link>
    <router-link to="/relation/group">
      <div class="myicon">
        <div :class="flag('/relation/group')">群聊</div>
      </div>
    </router-link>
    <router-link to="/relation/invite">
      <div class="myicon">
        <div :class="flag('/relation/invite')">新朋友</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  methods: {
    flag (url) {
      if (this.$route.path === url) {
        return 'text circle'
      } else {
        return 'text'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .menu
    position: absolute
    top: .8rem
    width: 100%
    height: .8rem
    background: #fff
    .myicon
      width: 25%
      height: 100%
      color: $bgcolor
      float: left
      position: relative
      .text
        position: absolute
        left: 10%
        top: 10%
        width: 80%
        height: 80%
        text-align: center
        font-size: .4rem
        line-height: .64rem
      .circle
        background: #ebf9fe
        border-radius: $radius
</style>
