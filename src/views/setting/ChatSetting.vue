<template>
  <div class="chatsetting">
    <LMHeader></LMHeader>
    <div @click="toUser" class="lr fz border-bottom">
      <div><img class="img" :src="$imgurl(friend.avatar)"/><span class="ellipsis">{{remark}}</span></div>
      <span class="iconfont">&#xe603;</span>
    </div>
    <div class="lr border-bottom line">
      <div @click="searchMsg">查找聊天记录</div>
      <div>图片、视频、文件等<span class="iconfont">&#xe603;</span></div>
    </div>
    <div class="border-bottom line lr">
      <div class="label">备注</div>
      <div>
        <input class="remark" type="text" v-model="remark" @keyup.enter="handleRemark" @click="handleShow"/>
        <span class="cancel" v-show="show" @click="cancel">取消</span>
      </div>
    </div>
    <div class="border-bottom line lr">
      <div class="label">分组</div>
      <select class="select" v-model="labelId">
        <option class="select" disabled :value="undefined">默认分组</option>
        <option class="select" v-for="item in list" :key="item.id" :value="item.id">{{item.name}}</option>
      </select>
    </div>
    <div class="border-bottom line center" v-text="friend.isFriendBlacklisted ? '解除拉黑' : '拉黑此人'" @click="blacklist">拉黑此人</div>
    <div class="border-bottom line center" @click="delMsg">删除聊天记录</div>
    <div class="border-bottom line center del" @click="delFriend">删除好友</div>
  </div>
</template>
<script>
import LMHeader from 'components/LMHeader.vue'
export default {
  name: 'ChatSetting',
  data () {
    return {
      friend: {},
      remark: '',
      labelId: '',
      list: [],
      show: false
    }
  },
  components: {
    LMHeader
  },
  methods: {
    searchMsg () {
      this.$router.push({
        path: '/message/search',
        query: {
          isGroup: false,
          otherId: this.$route.query.otherId,
          userId: this.$store.state.userId
        }
      })
    },
    handleShow () {
      this.show = true
    },
    cancel () {
      this.show = false
      this.remark = this.friend.remark
    },
    getFriendInfo () {
      this.$axios.get('/friend', {
        params: {
          friendId: this.$route.query.otherId,
          userId: this.$store.state.userId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.friend = data.data
          this.remark = this.friend.remark
          this.labelId = this.friend.labelId
        }
      })
    },
    getLabel () {
      this.$axios.get('/label', {
        params: {
          userId: this.$store.state.userId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.list = data.data
        }
      })
    },
    delMsg () {
      this.$axios.delete('/message/batch', {
        params: {
          isGroup: false,
          otherId: this.$route.query.otherId,
          userId: this.$store.state.userId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          console.log('delMsg')
        }
      })
    },
    delFriend () {
      this.$axios.delete('/friend', {
        params: {
          friendId: this.$route.query.otherId,
          userId: this.$store.state.userId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.$router.push({ path: '/home' })
        }
      })
    },
    blacklist () {
      if (this.friend.isFriendBlacklisted) {
        this.$axios.get('/friend/unblacklist', {
          params: {
            friendId: this.$route.query.otherId,
            userId: this.$store.state.userId
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.friend.isFriendBlacklisted = false
          }
        })
      } else {
        this.$axios.get('/friend/blacklist', {
          params: {
            friendId: this.$route.query.otherId,
            userId: this.$store.state.userId
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.friend.isFriendBlacklisted = true
          }
        })
      }
    },
    toUser () {
      this.$router.push({ path: '/user', query: { userId: this.$route.query.otherId } })
    },
    handleRemark () {
      this.$axios.put('/friend/remark', {
        friendId: this.$route.query.otherId,
        userId: this.$store.state.userId,
        remark: this.remark
      }).then((res) => {
        const data = res.data
        if (data.code !== 0) {
          this.remark = this.friend.remark
        } else {
          this.friend.remark = this.remark
          this.show = false
        }
      })
    },
    handleLabel () {
      this.$axios.put('/friend/move', {
        friendId: this.$route.query.otherId,
        userId: this.$store.state.userId,
        labelId: this.labelId
      }).then((res) => {
        const data = res.data
        if (data.code !== 0) {
          this.labelId = this.friend.labelId
        } else {
          this.friend.labelId = this.labelId
        }
      })
    }
  },
  watch: {
    labelId: function (newvalue, oldvalue) {
      if (newvalue !== oldvalue && oldvalue !== '') {
        this.handleLabel()
      }
    }
  },
  created () {
    this.getFriendInfo()
    this.getLabel()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
@import '~styles/mixins.styl'
  .border-bottom
    &:before
      border-color: $grey
  .chatsetting
    font-size: .4rem
    text-align: center
    .del
      color: red
    .ellipsis
      ellipsis()
    .line
      height: 1rem
      margin: auto .2rem
      .select
        background-color: #fff
        text-align: center
      .remark
        text-align: right
        width: 4rem
        padding-right: $pl
        ellipsis()
    .center
      line-height: 1rem
    .fz
      font-size: $fz
    .lr
      display: flex
      align-items: center
      justify-content: space-between
      .img
        width: 1.4rem
        height: 1.4rem
        margin: .1rem
        border-radius: $circle
</style>
