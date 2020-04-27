h<template>
  <div class="msglist" ref="msgbox" :style="{bottom: bottom + 'rem'}">
    <div class="first-child">
      <div class="msg" v-for="(item,index) in msglist" :key="item.id" :ref="item.id" :index="index" :style="{ 'flex-direction': item.senderId === $store.state.userId ? 'row-reverse' : 'row' }">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="word" v-text="item.content">一起吃个饭吧1</div>
      </div>
    </div>
  </div>
</template>
<script>
// first-child增长内容超过固定高度的wrapper时才会scroll生效，所以要把增长内容用两层div包裹
import Bus from '@/bus.js'
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
    var self = this
    Bus.$on('change-height', () => {
      if (self.bottom === 0.8) {
        self.bottom = 2.4
      } else {
        self.bottom = 0.8
      }
    })
    Bus.$on('pushmsg', (msg) => {
      if (msg.status === 0) {
        self.msglist.push(msg)
      } else {
        console.log('ref')
        console.log(self.$refs[msg.id])
        console.log(self.$refs[msg.id].index)
        self.msglist.splice(self.$refs[msg.id].index, 1)
      }
    })
    Bus.$on('refresh', () => self.getData())
    this.getData()
  },
  updated () {
    this.$refs.msgbox.scrollTop = this.$refs.msgbox.scrollHeight
  },
  methods: {
    getData () {
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
    overflow-y: scroll
    .first-child
      display: flex
      flex-direction: column-reverse
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
        .word
          font-size: .4rem
          padding: .1rem .2rem
          padding-top: .1rem
          color: #fff
          border-radius: $radius
          background-color: $bgcolor
  </style>
