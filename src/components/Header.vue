<template>
  <div class="header">
    <div class="left">
      <slot>消息</slot>
    </div>
    <router-link to="/innersearch" class="search-icon"><div class="iconfont">&#xe8b9; 搜索</div></router-link>
    <div class="iconfont right" @click="handleList">&#xe879;</div>
    <ul class="list" v-show="listshow">
      <router-link to="/creategroup">
        <li class="iconfont item">&#xe640; 发起群聊</li>
      </router-link>
      <router-link to="/search">
        <li class="iconfont item">&#xe649; 加好友/群</li>
      </router-link>
      <router-link to="/labelmanage">
        <li class="iconfont item">&#xe60d; 管理分组</li>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      listshow: false
    }
  },
  methods: {
    handleList () {
      this.listshow = !this.listshow
      console.log(this.listshow)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    color: #fff
    background-color: $bgcolor
    height: $height
    display: flex
    align-items: center
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    text-align: center
    position: relative
    .left
      width: 1.2rem
      font-size: .4rem
      margin-left: .1rem
    .search-icon
      flex: 1
      height: .7rem
      background: #fff
      color: $grey
      border-radius: $radius
      line-height: .7rem
    .right
      width: 1.2rem
      margin-right: .1rem
      color: #fff
    .list
      position: absolute
      right: .2rem
      top: 1rem
      width: 2.3rem
      height: 2.4rem
      background-color: #4b4b4c
      z-index: 1
      color: $bgcolor
      padding-left: $pl
      text-align: left
      border-radius: .2rem
      .item
        height: $height
        line-height: $height
</style>
