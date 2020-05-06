<template>
  <div class="footer">
    <router-link to="/home"><div class="iconfont myicon">&#xe62e;</div></router-link>
    <router-link to="/relation"><div class="iconfont myicon">&#xe61c;</div></router-link>
<!--     <router-link to="/home"><div class="iconfont myicon">&#xe600;</div></router-link> -->
    <router-link to="/me"><div class="iconfont myicon">&#xe63b;</div></router-link>
  </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .footer
    position: absolute
    bottom: 0
    width: 100%
    height: .8rem
    background: #fff
    .myicon
      width: 33.33%
      height: 100%
      color: $bgcolor
      float: left
      text-align: center
      font-size: .6rem
      line-height: .8rem
</style>
