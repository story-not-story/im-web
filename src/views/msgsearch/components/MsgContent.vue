<template>
  <div class="msglist" ref="msgbox">
    <div class="first-child" @click="hide">
      <div class="msg" @contextmenu.prevent @touchstart="gotouchstart(item, index)" @touchmove="gotouchmove" v-for="(item,index) in msglist" :key="item.id" :ref="item.id" :data-index="index" :style="{ 'flex-direction': item.senderId === $store.state.userId ? 'row-reverse' : 'row' }">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)" @click.stop="userinfo(item.senderId)"/>
        <div class="wrapper" v-if="isGroupAll" :style="{ 'align-items': item.senderId === $store.state.userId ? 'flex-end' : 'flex-start' }">
          <div class="name" v-text="item.name"></div>
          <div class="word" v-text="item.content">一起吃个饭吧1</div>
        </div>
        <div v-else class="word" v-text="item.content">一起吃个饭吧1</div>
      </div>
      <div class="msg" v-show="show">
        <div class="blacklisted">你已被对方拉黑，无法发送消息！</div>
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
import Bus from '@/bus.js'
export default {
  name: 'MsgContent',
  data () {
    return {
      maxScrollY: 0,
      y: 0,
      msglist: [],
      timeOutEvent: null,
      menushow: false,
      curMsg: null,
      curMsgIndex: '',
      show: false,
      isGroupAll: false
    }
  },
  created () {
    const self = this
    if (this.$route.query.isGroup === true || typeof this.$route.query.isGroup == 'string' && this.$route.query.isGroup === 'true') {// eslint-disable-line
      this.isGroupAll = true
    } else {
      this.isGroupAll = false
    }
    Bus.$on('searchmsg', (text) => {
      if (text === '') {
        self.getData()
      } else {
        self.searchData(text)
      }
    })
    if (this.$route.query.text) {
      this.searchData(this.$route.query.text)
    } else {
      this.getData()
    }
  },
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
    searchData (text) {
      this.$axios.get('/message/search', {
        params: {
          isGroup: this.$route.query.isGroup,
          otherId: this.$route.query.otherId,
          userId: this.$store.state.userId,
          text: text
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.msglist = data.data
        }
      })
    },
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
      this.$axios.delete('/message', {
        params: {
          id: this.curMsg.id,
          userId: this.$store.state.userId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
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
    },
    userinfo (userId) {
      if (userId === this.$store.state.userId) {
        this.$router.push({ path: '/me' })
      } else {
        this.$router.push({ path: '/user', query: { userId: userId } })
      }
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
    top: 2.4rem
    bottom: 0
    overflow-y: scroll
    .menu
      z-index: 1
      position: fixed
      border-radius: $radius
      left: 50%
      top: 50%
      width: 3.6rem
      height: $height
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
      .wrapper
        display: flex
        flex-direction: column
        align-items: flex-start
        .name
          color: #ccc
          font-size: .3rem
          margin-bottom: .1rem
      .blacklisted
        margin: auto
        text-align: center
        font-size: .4rem
        padding: .1rem .2rem
        padding-top: .1rem
        color: #fff
        border-radius: $radius
        background-color: rgba(0, 0, 0, 0.5)
  </style>
