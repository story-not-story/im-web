<template>
  <div class="menu">
    <router-link to="/relation">
      <div class="myicon">
        <div :class="flag('/relation')">全部</div>
      </div>
    </router-link>
    <router-link to="/relation/label">
      <div class="myicon">
        <div :class="flag('/relation/label')">图/视频</div>
      </div>
    </router-link>
    <router-link to="/relation/group">
      <div class="myicon">
        <div :class="flag('/relation/group')">表情</div>
      </div>
    </router-link>
    <router-link to="/relation/invite">
      <div class="myicon">
        <div :class="flag('/relation/invite')">文件</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'FileType',
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
    // position: absolute
    // top: .8rem
    width: 100%
    height: $height
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
