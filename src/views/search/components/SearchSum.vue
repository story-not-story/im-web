<template>
  <div class="friendlist" ref="wrapper">
    <div class="first-child">
      <div class="category">联系人</div>
      <div class="friend border-topbottom" v-for="item in friendlist" :key="item.id">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc">
          <div class="remark" v-text="item.name">胡君</div>
          <div class="word" v-text="item.signature">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
      <div class="more">查看更多&#xe603;</div>
      <div class="category">群聊</div>
      <div class="friend border-topbottom" v-for="item in grouplist" :key="item.id">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc">
          <div class="remark" v-text="item.name">胡君</div>
          <div class="word" v-text="item.signature">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
      <div class="more">查看更多&#xe603;</div>
      <div class="category">消息</div>
      <div class="friend border-topbottom" v-for="item in msglist" :key="item.id">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc">
          <div class="remark" v-text="item.name">胡君</div>
          <div class="word" v-text="item.content">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
      <div class="more">查看更多&#xe603;</div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Bus from '@/bus.js'
export default {
  name: 'SearchSum',
  data () {
    return {
      friendlist: [],
      grouplist: [],
      msglist: []
    }
  },
  created () {
    Bus.$on('searchsum', (text) => {
      function getFriend (text) {
        return this.$axios.get('/friend/search', {
          params: {
            userId: this.$store.state.userId,
            text: text
          }
        })
      }

      function getGroup (text) {
        return this.$axios.get('/group/search', {
          params: {
            userId: this.$store.state.userId,
            text: text
          }
        })
      }

      function getMsg (text) {
        return this.$axios.get('/message/search', {
          params: {
            userId: this.$store.state.userId,
            text: text
          }
        })
      }

      this.$axios.all([getFriend(text), getGroup(text), getMsg(text)])
        .then(this.$axios.spread(function (fres, gres, mres) {
          const fdata = fres.data
          const gdata = gres.data
          const mdata = mres.data
          if (fdata.code === 0) {
            this.friendlist = fdata.data
          }
          if (gdata.code === 0) {
            this.grouplist = gdata.data
          }
          if (mdata.code === 0) {
            this.msglist = mdata.data
          }
        }))
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
    top: .8rem
    right: 0
    bottom: 0
    left: 0
    .category
      padding: .1rem .1rem .1rem .2rem
    .more
      text-align: center
      padding: .1rem .1rem .1rem .2rem
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
