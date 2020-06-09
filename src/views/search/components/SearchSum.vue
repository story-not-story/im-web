<template>
  <div class="friendlist" ref="wrapper">
    <div class="first-child">
      <div class="category" v-show="show" @click="handleBack">返回</div>
      <div v-show="top3friend.length > 0">
        <div class="category">好友</div>
        <div class="friend border-topbottom" v-for="item in top3friend" :key="item.id" @click="$router.push({ path: '/message', query: { isGroup: false, otherId: item.friendId, name: item.name } })">
          <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
          <div class="desc">
            <div class="remark" v-text="item.name">胡君</div>
            <div class="word" v-text="item.signature">[手机在线] 不惧风雨前进</div>
          </div>
        </div>
        <div class="more iconfont" @click="handleClick(0)" v-show="!show">查看更多&#xe603;</div>
      </div>
      <div v-show="top3group.length > 0">
        <div class="category">群聊</div>
        <div class="friend border-topbottom" v-for="item in top3group" :key="item.id" @click="$router.push({ path: '/message', query: { isGroup: true, otherId: item.id, name: item.name } })">
          <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
          <div class="desc">
            <div class="remark" v-text="item.name">胡君</div>
            <div class="word" v-text="item.signature">[手机在线] 不惧风雨前进</div>
          </div>
        </div>
        <div class="more iconfont" @click="handleClick(1)" v-show="!show">查看更多&#xe603;</div>
      </div>
      <div v-show="top3msg.length > 0">
        <div class="category">消息</div>
        <div class="friend border-topbottom" v-for="item in top3msg" :key="item.id" @click="toMsgSearch(item.msglist[0])">
          <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
          <div class="desc">
            <div class="remark" v-text="item.name">胡君</div>
            <div class="word" v-text="item.msglist.length + '条'"></div>
          </div>
        </div>
        <div class="more iconfont" @click="handleClick(2)" v-show="!show">查看更多&#xe603;</div>
      </div>
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
      msglist: [],
      top3friend: [],
      top3group: [],
      top3msg: [],
      show: false,
      text: ''
    }
  },
  methods: {
    toMsgSearch (msg) {
      const otherId = msg.senderId === this.$store.state.userId ? msg.receiverId : msg.senderId
      this.$router.push({
        path: '/message/search',
        query: {
          isGroup: msg.isGroup,
          otherId: otherId,
          userId: this.$store.state.userId,
          text: this.text
        }
      })
    },
    handleClick (index) {
      switch (index) {
        case 0:
          this.top3group = []
          this.top3msg = []
          this.top3friend = this.friendlist
          break
        case 1:
          this.top3group = this.grouplist
          this.top3msg = []
          this.top3friend = []
          break
        case 2:
          this.top3group = []
          this.top3msg = this.msglist
          this.top3friend = []
          break
      }
      this.show = !this.show
    },
    handleBack () {
      this.top3friend = this.friendlist.slice(0, 3)
      this.top3group = this.grouplist.slice(0, 3)
      this.top3msg = this.msglist.slice(0, 3)
      this.show = !this.show
    }
  },
  created () {
    const self = this
    Bus.$on('searchsum', (text) => {
      self.text = text
      self.friendlist = []
      self.grouplist = []
      self.msglist = []
      self.show = false
      function getFriend (text) {
        return self.$axios.get('/friend/search', {
          params: {
            userId: self.$store.state.userId,
            text: text
          }
        })
      }

      function getGroup (text) {
        return self.$axios.get('/group/search', {
          params: {
            userId: self.$store.state.userId,
            text: text
          }
        })
      }

      function getMsg (text) {
        return self.$axios.get('/message/search', {
          params: {
            userId: self.$store.state.userId,
            text: text
          }
        })
      }

      self.$axios.all([getFriend(text), getGroup(text), getMsg(text)])
        .then(self.$axios.spread(function (fres, gres, mres) {
          const fdata = fres.data
          const gdata = gres.data
          const mdata = mres.data
          if (fdata.code === 0) {
            self.friendlist = fdata.data
            self.top3friend = self.friendlist.slice(0, 3)
          } else {
            self.friendlist = []
            self.top3friend = []
          }
          if (gdata.code === 0) {
            self.grouplist = gdata.data
            self.top3group = self.grouplist.slice(0, 3)
          } else {
            self.grouplist = []
            self.top3group = []
          }
          if (mdata.code === 0) {
            self.msglist = mdata.data
            self.top3msg = self.msglist.slice(0, 3)
          } else {
            self.msglist = []
            self.top3msg = []
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
    font-size: .4rem
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
          font-size: $fz
        .word
          font-size: .2rem
          padding-top: .1rem
          color: $grey
</style>
