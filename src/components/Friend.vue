<template>
  <div class="friendlist" ref="wrapper">
    <div class="first-child">
      <div v-for="(value, name) in map" :key="name">
        <div class="letter" v-text="name">A</div>
        <div class="friend" @click="handleClick(item.friendId)" v-for="item in value" :key="item.friendId">
          <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
          <div class="desc border-topbottom">
            <div class="remark" v-text="item.remark">胡君</div>
            <div class="word" v-text="item.signature">[手机在线] 不惧风雨前进</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Bus from '@/bus.js'
export default {
  name: 'Friend',
  props: {
    map: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleClick (userId) {
      this.$router.push({ path: '/user', query: { userId: userId } })
    },
    scrollToLetter (letter) {
      const area = this.$refs[letter][0]
      this.scroll.scrollToElement(area)
    },
    changeMap (map) {
      this.map = map
    }
  },
  created () {
    Bus.$on('changeletter', this.scrollToLetter)
    Bus.$on('change-map', this.changeMap)
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
  .border-topbottom
    &:before
      border-color: $grey
    &:after
      border-color: $grey
  .friendlist
    position: absolute
    overflow: hidden
    top: 1.6rem
    right: 0
    bottom: .8rem
    left: 0
    .letter
      padding: .1rem
      background: $grey
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
        .remark
          padding-top: .2rem
          font-size: .5rem
        .word
          font-size: .2rem
          padding-top: .1rem
          color: $grey
</style>
