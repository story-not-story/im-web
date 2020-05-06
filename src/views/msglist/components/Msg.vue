<template>
  <div class="msglist" ref="wrapper">
    <div class="first-child">
      <div class="msg" @click="handleClick(item)" v-for="item in msglist" :key="item.id">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc border-topbottom">
          <div class="line1">
            <div class="remark" v-text="item.name">胡君</div>
            <div class="time" v-text="formatDate(item.gmtCreate)">昨天</div>
          </div>
          <div class="word" v-text="item.content">一起吃个饭吧</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// first-child增长内容超过固定高度的wrapper时才会scroll生效，所以要把增长内容用两层div包裹
import BScroll from 'better-scroll'
export default {
  name: 'Msg',
  data () {
    return {
      msglist: []
    }
  },
  methods: {
    handleClick (item) {
      this.$router.push({
        path: '/message',
        query: {
          isGroup: item.isGroup,
          otherId: item.receiverId === this.$store.state.userId ? item.senderId : item.receiverId,
          userId: this.$store.state.userId,
          name: item.name
        }
      })
    },
    formatDate (UTCDateString) {
      var date = new Date(UTCDateString)
      var now = new Date()
      var yesterday = new Date((now.getTime() - 24 * 3600 * 1000))
      var weekstartstr = new Date(now.getTime() - ((now.getDay() + 6) % 7) * 24 * 3600 * 1000).toLocaleDateString()
      var weekstart = new Date(weekstartstr)
      if (now.toLocaleDateString() === date.toLocaleDateString()) {
        var arr = date.toLocaleTimeString().split(':')
        return arr[0] + ':' + arr[1]
      } else if (yesterday.toLocaleDateString() === date.toLocaleDateString()) {
        return '昨天'
      } else if (date > weekstart && date.getTime() < weekstart.getTime() + 7 * 24 * 3600 * 1000) {
        var weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        return weekday[date.getDay()]
      }
      return date.toLocaleDateString()
    }
  },
  created () {
    this.$axios.get('/message/list', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.msglist = data.data
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
  .msglist
    position: absolute
    overflow: hidden
    top: .8rem
    right: 0
    bottom: .8rem
    left: 0
    .first-child
      display: flex
      flex-direction: column-reverse
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
