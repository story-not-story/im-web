<template>
  <div class="msglist" ref="msgbox" :style="{bottom: bottom + 'rem'}">
    <div class="first-child" @click="hide">
      <div class="msg" @contextmenu.prevent @touchstart="gotouchstart(item, index)" @touchmove="gotouchmove" v-for="(item,index) in msglist" :key="item.id" :ref="item.id" :data-index="index" :style="{ 'flex-direction': item.senderId === $store.state.userId ? 'row-reverse' : 'row' }">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="word" v-text="item.content">一起吃个饭吧1</div>
      </div>
      <div class="menu" v-show="menushow">
        <div class="btn border-right" @click.stop="cancel" v-if="menushow && curMsg.senderId === $store.state.userId">撤回</div>
        <div class="btn border-right" @click.stop="del">删除</div>
        <div class="btn" @click.stop="copy">复制</div>
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
      bottom: 0.8,
      timeOutEvent: null,
      menushow: false,
      curMsg: null,
      curMsgIndex: ''
    }
  },
  created () {
    var self = this
    Bus.$on('change-height', () => {
      if (self.bottom === 0.8) {
        self.bottom = 2.4
        this.$nextTick(() => {
          this.$refs.msgbox.scrollTop = this.$refs.msgbox.scrollHeight
        })
      } else {
        self.bottom = 0.8
      }
    })
    Bus.$on('pushmsg', (msg) => {
      console.log(msg.status == 0)//eslint-disable-line
      if (msg.status === 0) {
        self.msglist.push(msg)
        this.$nextTick(() => {
          this.$refs.msgbox.scrollTop = this.$refs.msgbox.scrollHeight
        })
      } else {
        console.log('ref')
        const index = self.$refs[msg.id][0].dataset.index
        self.msglist.splice(index, 1)
      }
    })
    Bus.$on('refresh', () => self.getData())
    this.getData()
  },
  // computed: {
  //   length: function () {
  //     return this.msglist.length
  //   }
  // },
  watch: {
    msglist: function (value, oldvalue) {
      if (value.length > oldvalue.length) {
        this.$nextTick(() => {
          this.$refs.msgbox.scrollTop = this.$refs.msgbox.scrollHeight
        })
      }
    }
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
    },
    gotouchstart (item, index) {
      const self = this
      clearTimeout(this.timeOutEvent)// 清除定时器
      this.timeOutEvent = setTimeout(function () {
        self.curMsg = item
        self.curMsgIndex = index
        self.menushow = true
      }, 500)// 这里设置定时
    },
    gotouchmove () {
      clearTimeout(this.timeOutEvent)// 清除定时器
      this.menushow = false
    },
    hide () {
      clearTimeout(this.timeOutEvent)// 清除定时器
      this.menushow = false
    },
    cancel () {
      this.curMsg.status = 1
      if (this.curMsg.senderId === this.$store.state.userId) {
        this.$ws.websocket.send(JSON.stringify(this.curMsg))
        this.msglist.splice(this.curMsgIndex, 1)
      }
      this.menushow = false
    },
    del () {
      this.$axios.get('/message/delete', {
        params: {
          id: this.curMsg.id,
          userId: this.$store.state.userId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          console.log()
        }
      })
      this.msglist.splice(this.curMsgIndex, 1)
      this.menushow = false
    },
    copy () {
      this.$copyText(this.curMsg.content).then(function (e) {
        console.log('copy success')
      }, function (e) {
        console.log('copy fail')
      })
      this.menushow = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .border-right
    &:before
      border-color: #fff
  .msglist
    position: absolute
    left: 0
    right: 0
    top: .8rem
    bottom: .8rem
    overflow-y: scroll
    .menu
      z-index: 1
      position: fixed
      border-radius: $radius
      left: 50%
      top: 50%
      width: 3.6rem
      height: .8rem
      transform: translateX(-50%) translateY(-50%)
      padding: .1rem
      background-color: rgba(0, 0, 0, 0.5)
      display: flex
      align-items: center
      justify-content: center
      .btn
        width: 33.33%
        font-size: .4rem
        color: #fff
        text-align: center
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
