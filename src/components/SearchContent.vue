<template>
  <div class="friendlist" ref="wrapper">
    <div class="first-child">
      <div class="friend border-topbottom" v-for="item in list" :key="item.id">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc">
          <div class="remark" v-text="item.name">胡君</div>
          <div class="word" v-text="item.signature">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Bus from '@/bus.js'
export default {
  name: 'SearchContent',
  data () {
    return {
      list: []
    }
  },
  created () {
    Bus.$on('search', (text, flag) => {
      if (flag) {
        this.$axios.get('/list', {
          params: {
            text: text
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            if (Array.isArray(data.data)) {
              this.list = data.data
            } else {
              this.$router.push({ path: '/user', query: { userId: data.data.id } })
            }
          }
        })
      } else {
        this.$axios.get('/group/list', {
          params: {
            text: text
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            if (Array.isArray(data.data)) {
              this.list = data.data
            } else {
              this.$router.push({ path: '/groupinfo', query: { groupId: data.data.id } })
            }
          }
        })
      }
    })
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
    bottom: 0
    left: 0
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
