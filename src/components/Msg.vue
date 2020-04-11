<template>
  <div class="msglist" ref="wrapper">
    <div class="first-child">
      <div class="msg" @click="handleClick">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="line1">
            <div class="remark">胡君</div>
            <div class="time">昨天</div>
          </div>
          <div class="word">一起吃个饭吧</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// first-child增长内容超过固定高度的wrapper时才会scroll生效，所以要把增长内容用两层div包裹
import BScroll from 'better-scroll'
export default {
  name: 'Msg',
  data () {
    return {
      img: require('img/yumizhou.jpeg')
    }
  },
  methods: {
    handleClick () {
      this.$router.push({ path: '/message' })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
        console.log('scroll')
      } else if (this.$refs.wrapper) {
        this.scroll.refresh()
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .border-topbottom
    &:before
      border-color: $grey
    &:after
      border-color: $grey
  .msglist
    position: absolute
    overflow: hidden
    top: .8rem
    right: 0
    bottom: .8rem
    left: 0
    .msg
      display: flex
      width: 100%
      height: 1.4rem
      .img
        width: 1.2rem
        height: 1.2rem
        float: left
        margin: .1rem
        border-radius: $circle
      .desc
        flex: 1
        padding-left: $pl
        .line1
          padding-top: .2rem
          display: flex
          justify-content: space-between
          align-items: baseline
          .remark
            font-size: .6rem
          .time
            padding-right: .1rem
            color: $grey
        .word
          padding-top: .1rem
          color: $grey
</style>
