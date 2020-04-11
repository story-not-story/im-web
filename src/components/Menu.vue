<template>
  <div class="menu">
    <router-link to="/relation">
      <div class="myicon">
        <div class="circle">好友</div>
      </div>
    </router-link>
    <router-link to="/relation/label">
      <div class="myicon">
        <div class="circle">分组</div>
      </div>
    </router-link>
    <router-link to="/relation/group">
      <div class="myicon">
        <div class="circle">群聊</div>
      </div>
    </router-link>
    <router-link to="/relation/newfriend">
      <div class="myicon">
        <div class="circle">新朋友</div>
      </div>
    </router-link>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'Menu'
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
      .circle
        position: absolute
        left: 10%
        top: 10%
        width: 80%
        height: 80%
        text-align: center
        font-size: .4rem
        line-height: .64rem
        background: #ebf9fe
        border-radius: $radius
</style>
