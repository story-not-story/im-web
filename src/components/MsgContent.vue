<template>
  <div class="msglist" ref="msg-box" :style="{bottom: bottom + 'rem'}">
<!--     <div class="first-child">
      <div class="msg" v-for="item in msglist" :key="item.id">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)" :style="{ float: item.senderId === $store.state.userId ? 'right' : 'left' }"/>
        <div class="desc border-topbottom">
          <div class="word" v-text="item.content">一起吃个饭吧1</div>
        </div>
      </div>
    </div> -->
    <div class="msg" v-for="(item,index) in msglist" :key="item.id" :ref="item.id" :id="index" :style="{ 'flex-direction': item.senderId === $store.state.userId ? 'row-reverse' : 'row' }">
      <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
<!--       <div class="desc border-topbottom">
        <div class="word" v-text="item.content">一起吃个饭吧1</div>
      </div> -->
      <div class="word" v-text="item.content">一起吃个饭吧1</div>
    </div>
  </div>
</template>
<script>
// first-child增长内容超过固定高度的wrapper时才会scroll生效，所以要把增长内容用两层div包裹
import Bus from '@/bus.js'
// import BScroll from 'better-scroll'
export default {
  name: 'MsgContent',
  data () {
    return {
      maxScrollY: 0,
      y: 0,
      msglist: [],
      bottom: 0.8
    }
  },
  created () {
    var that = this
    Bus.$on('change-height', () => {
      if (that.bottom === 0.8) {
        that.bottom = 2.4
        // console.log(that.scroll.y)
        // that.maxScrollY = that.scroll.maxScrollY
        // if (that.maxScrollY !== 0) {
        //   that.y = that.scroll.y - 80
        //   if (that.y < that.maxScrollY) {
        //     that.scroll.scrollTo(0, that.maxScrollY - 1, 0)
        //   } else {
        //     that.scroll.scrollTo(0, that.y, 100)
        //   }
        // }
        // console.log(that.scroll.y)
      } else {
        that.bottom = 0.8
        // const len = that.scroll.y <= -80 ? 80 : -that.scroll.y
        // that.maxScrollY = that.scroll.maxScrollY
        // console.log(that.scroll.y)
        // that.scroll.scrollBy(0, len, 100)
        // console.log(that.scroll.y)
      }
    })
    Bus.$on('pushmsg', (msg) => {
      if (msg.status === 0) {
        that.msglist.push(msg)
      } else {
        that.msglist.splice(that.$refs[msg.id].id, 1)
      }
    })
    this.$axios.get('/message/detail', {
      params: {
        isGroup: this.$route.query.isGroup,
        otherId: this.$route.query.otherId,
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.msglist = data.data
      }
    })
  }
  // mounted () {
  //   this.$nextTick(() => {
  //     if (!this.scroll) {
  //       this.scroll = new BScroll(this.$refs.wrapper, {
  //         click: true
  //       })
  //       this.scroll.on('refresh', () => {
  //         console.log('refresh ok')
  //         console.log('max' + this.scroll.maxScrollY)
  //         console.log('y' + this.scroll.y)
  //         if (this.maxScrollY > this.scroll.maxScrollY && this.scroll.y === this.maxScrollY) {
  //           this.scroll.scrollTo(0, this.y, 100)
  //         }
  //       })
  //       console.log('scroll')
  //     } else if (this.$refs.wrapper) {
  //       this.scroll.refresh()
  //     }
  //   })
  // }
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
    // overflow: hidden
    overflow-y: scroll
    .msg
      display: flex
      width: 100%
      height: 1.4rem
      align-items: center
      .img
        width: 1.2rem
        height: 1.2rem
        margin: .1rem
        border-radius: $circle
      // .desc
      //   flex: 1
      //   padding-left: $pl
      //   display: flex
      //   align-items: center
      .word
        font-size: .4rem
        padding: .1rem .2rem
        padding-top: .1rem
        color: #fff
        border-radius: $radius
        background-color: $bgcolor
</style>
