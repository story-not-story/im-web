<template>
  <div class="footer">
    <div class="line1">
      <div class="left" @click="handleClick">
        <div class="iconfont myicon" v-if="show">&#xe608;</div>
        <div class="iconfont myicon" v-else>&#xe7e2;</div>
      </div>
      <div class="input">
        <input class="text" type="text" name="search"/>
      </div>
      <div class="right">
        <span class="iconfont myicon" @click="handleEmoji">&#xe60b;</span>
        <span class="iconfont myicon" @click="handleMore">&#xe726;</span>
      </div>
    </div>
    <div class="dropdown" v-show="emojishow">
      <div class="emoji" v-for="item in emojiarr" :key="item">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#' + item"></use>
        </svg>
      </div>
    </div>
    <div class="dropdown" v-show="moreshow">
      <div class="iconfont myicon less">&#xe629;</div>
      <div class="iconfont myicon more">&#xe675;</div>
      <div class="iconfont myicon">&#xe6c6;</div>
      <div class="iconfont myicon">&#xe963;</div>
      <div class="iconfont myicon">&#xe62a;</div>
      <div class="iconfont myicon">&#xe611;</div>
      <div class="iconfont myicon">&#xe613;</div>
      <div class="iconfont myicon">&#xe6df;</div>
    </div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'MsgFooter',
  data () {
    return {
      show: true,
      emojishow: false,
      moreshow: false,
      emojiarr: [
        'icon-damuzhi', 'iconemojibiaoqing-1', 'iconemojibiaoqing-2', 'iconemojibiaoqing-3',
        'iconemojibiaoqing-6', 'iconemojibiaoqing-7', 'iconemojibiaoqing-10', 'iconemojibiaoqing-12',
        'iconemojibiaoqing-13', 'iconemojibiaoqing-14', 'iconemojibiaoqing-16', 'iconemojibiaoqing-17',
        'iconemojibiaoqing-18', 'iconemojibiaoqing-19', 'iconemojibiaoqing-20', 'iconemojibiaoqing-21',
        'iconemojibiaoqing-22', 'iconemojibiaoqing-24', 'iconemojibiaoqing-25', 'iconemojibiaoqing-27',
        'iconemojibiaoqing-28', 'iconemojibiaoqing-29', 'iconemojibiaoqing-30', 'iconemojibiaoqing-32',
        'iconemojibiaoqing-33', 'iconemojibiaoqing-34', 'iconemojibiaoqing-35', 'iconemojibiaoqing-36',
        'iconemojibiaoqing-42', 'iconemojibiaoqing-110', 'iconemojibiaoqing-211', 'iconbiaoqingkunhuo'
      ]
    }
  },
  methods: {
    handleClick () {
      this.show = !this.show
    },
    handleEmoji () {
      if (!this.emojishow && this.moreshow) {
        this.moreshow = false
      }
      this.emojishow = !this.emojishow
      Bus.$emit('change-height')
    },
    handleMore () {
      if (this.emojishow && !this.moreshow) {
        this.emojishow = false
      }
      this.moreshow = !this.moreshow
      Bus.$emit('change-height')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .footer
    position: absolute
    bottom: 0
    width: 100%
    .line1
      display: flex
      align-items: center
      line-height: $height
      background-color: $bgcolor
      background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
      color: #fff
      text-align: center
      .left
        width: .6rem
        float: left
        margin-left: .1rem
        .myicon
          font-size: .6rem
      .input
        flex: 1
        height: .64rem
        line-height: .64rem
        margin: .1rem
        background: #fff
        color: $grey
        border-radius: $radius
        overflow: hidden
        .text
          text-align: center
          width: 100%
          height: 100%
      .right
        width: 1.4rem
        float: right
        color: #fff
        .myicon
          font-size: .6rem
          margin-right: .1rem
    .dropdown
      width: 100%
      height: 1.6rem
      background: #fff
      .myicon
        width: 25%
        height: 50%
        color: $bgcolor
        float: left
        text-align: center
        font-size: .6rem
        line-height: .8rem
      .emoji
        width: 12.5%
        height: 25%
        float: left
        text-align: center
        line-height: .4rem
      .less
        font-size: .5rem
      .more
        font-size: .7rem
</style>
