<template>
  <div class="header">
    <div class="input-header" v-if="show">
      <div class="left">消息</div>
      <div class="iconfont search-icon" @click="handleClick">&#xe8b9; 搜索</div>
      <div class="iconfont right" @click="handleList" v-if="show">&#xe879;</div>
      <ul class="list" v-show="listshow">
        <router-link to="/creategroup">
          <li class="iconfont item">&#xe640; 发起群聊</li>
        </router-link>
        <router-link to="/search">
          <li class="iconfont item">&#xe649; 加好友/群</li>
        </router-link>
      </ul>
    </div>
    <div class="input" v-else>
      <div class="input-left">
        <div class="iconfont search-icon2">&#xe8b9;</div>
        <input class="text" type="text" name="search" placeholder="搜索" v-model="text"/>
        <div class="iconfont clear-icon" v-show="clearshow" @click="handelClear">&#xe635;</div>
      </div>
      <div class="input-right" @click="handleClick">取消</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      listshow: false,
      show: true,
      text: ''
    }
  },
  methods: {
    handleList () {
      this.listshow = !this.listshow
    },
    handleClick () {
      this.show = !this.show
    },
    handelClear () {
      this.text = ''
    }
  },
  computed: {
    clearshow () {
      return this.text !== ''
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    color: #fff
    background-color: $bgcolor
  .input-header
    height: .8rem
    display: flex
    align-items: center
    line-height: $height
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    text-align: center
    position: relative
    .left
      width: 1.2rem
      float: left
      font-size: .5rem
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
      float: right
      color: #fff
    .list
      position: absolute
      right: .2rem
      top: 1rem
      width: 2.3rem
      height: 1.6rem
      background-color: #4b4b4c
      z-index: 1
      color: $bgcolor
      padding-left: $pl
      text-align: left
      border-radius: .2rem
      .item
        height: 50%
        line-height: .8rem
  .input
    height: 50%
    margin-left: .1rem
    display: flex
    align-items: center
    .input-left
      height: .7rem
      flex: 1
      background: #fff
      color: $grey
      border-radius: $radius
      display: flex
      align-items: center
      padding: 0 .1rem
      .search-icon2
        float: left
        width: 8%
      .text
        flex: 1
      .clear-icon
        width: 8%
        float: right
    .input-right
      width: 1rem
      float: right
      font-size: .4rem
      line-height: .8rem
</style>
