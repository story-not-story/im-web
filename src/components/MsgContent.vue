<template>
  <div class="msglist" ref="wrapper" :style="{bottom: bottom + 'rem'}">
    <div class="first-child">
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧1</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧2</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧3</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧4</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧5</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧6</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧7</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧8</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧9</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧10</div>
        </div>
      </div>
      <div class="msg">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="word">一起吃个饭吧11</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// first-child增长内容超过固定高度的wrapper时才会scroll生效，所以要把增长内容用两层div包裹
import Bus from '@/bus.js'
import BScroll from 'better-scroll'
export default {
  name: 'MsgContent',
  data () {
    return {
      img: require('img/yumizhou.jpeg'),
      bottom: 0.8,
      maxScrollY: 0,
      y: 0
    }
  },
  created () {
    var that = this
    Bus.$on('change-height', () => {
      if (that.bottom === 0.8) {
        that.bottom = 2.4
        console.log(that.scroll.y)
        that.maxScrollY = that.scroll.maxScrollY
        if (that.maxScrollY !== 0) {
          that.y = that.scroll.y - 80
          if (that.y < that.maxScrollY) {
            that.scroll.scrollTo(0, that.maxScrollY - 1, 0)
          } else {
            that.scroll.scrollTo(0, that.y, 100)
          }
        }
        console.log(that.scroll.y)
      } else {
        that.bottom = 0.8
        const len = that.scroll.y <= -80 ? 80 : -that.scroll.y
        that.maxScrollY = that.scroll.maxScrollY
        console.log(that.scroll.y)
        that.scroll.scrollBy(0, len, 100)
        console.log(that.scroll.y)
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
        this.scroll.on('refresh', () => {
          console.log('refresh ok')
          console.log('max' + this.scroll.maxScrollY)
          console.log('y' + this.scroll.y)
          if (this.maxScrollY > this.scroll.maxScrollY && this.scroll.y === this.maxScrollY) {
            this.scroll.scrollTo(0, this.y, 100)
          }
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
    left: 0
    right: 0
    top: .8rem
    bottom: .8rem
    overflow: hidden
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
        .word
          padding-top: .1rem
          color: $grey
</style>
