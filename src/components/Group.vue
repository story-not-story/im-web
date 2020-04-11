<template>
  <div class="group" ref="wrapper">
    <div class="first-child">
      <div v-for="(item,index) in list" :key="index">
        <div class="title" @click="handleClick(item)">
          <span class="iconfont" v-if="item.show">&#xe6aa;</span>
          <span class="iconfont" v-else>&#xe69b;</span>
          {{item.name}}
        </div>
        <div class="dropdown" v-show="item.show">
          <div class="friend" @click="handleMsg">
            <img class="img" alt="玉米粥" :src="img"/>
            <div class="desc border-topbottom">南邮计软</div>
          </div>
          <div class="friend" @click="handleMsg">
            <img class="img" alt="玉米粥" :src="img"/>
            <div class="desc border-topbottom">南邮计软</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'Group',
  data () {
    return {
      img: require('img/yumizhou.jpeg'),
      list: [{ name: '置顶群聊', show: false }, { name: '我创建的群聊', show: false }, { name: '我管理的群聊', show: false }, { name: '我加入的群聊', show: false }]
    }
  },
  methods: {
    handleClick (item) {
      item.show = !item.show
    },
    handleMsg () {
      this.$router.push({ path: '/message' })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      } else if (this.$refs.wrapper) {
        this.scroll.refresh()
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .group
    position: absolute
    overflow: hidden
    top: 1.6rem
    right: 0
    bottom: .8rem
    left: 0
    padding-left: .1rem
    .title
      height: .75rem
      line-height: .75rem
      font-size: .5rem
    .dropdown
      padding-left: $pl
      .friend
        display: flex
        width: 100%
        height: 1.2rem
        .img
          width: 1rem
          height: 1rem
          float: left
          margin: .1rem
          border-radius: $circle
        .desc
          flex: 1
          padding-left: $pl
          font-size: .5rem
          line-height: 1.2rem
</style>
