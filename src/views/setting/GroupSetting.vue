<template>
  <div class="chatsetting">
    <LMHeader>群聊设置</LMHeader>
    <div @click="toGroup" class="lr fz border-bottom">
      <div><img class="img" :src="$imgurl(group.avatar)"/><span class="ellipsis" v-text="group.name"></span></div>
      <span class="iconfont">&#xe603;</span>
    </div>
    <div class="border-bottom line lr">
      <div class="label">我的群昵称</div>
      <div>
        <input class="remark" type="text" v-model="remark" @keyup.enter="handleRemark" @click="handleShow"/>
        <span class="cancel" v-show="show" @click="cancel">取消</span>
      </div>
    </div>
    <div class="border-bottom line lr">
      <div class="label">群签名</div>
      <div>
        <input class="remark" type="text" :disabled="disabled" v-model="signature" @keyup.enter="handleSignature" @click="handleShow1"/>
        <span class="cancel" v-show="show1" @click="cancel1">取消</span>
      </div>
    </div>
    <div class="lr border-bottom line">
      <div @click="searchMsg">查找聊天记录</div>
      <div>图片、视频、文件等<span class="iconfont">&#xe603;</span></div>
    </div>
    <div class="lr border-bottom line">
      <div>群文件</div>
      <span class="iconfont">&#xe603;</span>
    </div>
    <div class="lr border-bottom line" @click="toTextArea">
      <div>群公告</div>
      <span class="iconfont">&#xe603;</span>
    </div>
    <div class="lr border-bottom line">
      <div>群成员</div>
      <span class="iconfont">&#xe603;</span>
    </div>
    <div class="lr border-bottom line">
      <div>管理员</div>
      <span class="iconfont">&#xe603;</span>
    </div>
    <div class="border-bottom line center" @click="delMsg">删除聊天记录</div>
    <div class="border-bottom line center del" v-text="me.grade === 2 ? '解散群': '退出该群'" @click="delGroup">退出该群</div>
  </div>
</template>
<script>
import LMHeader from 'components/LMHeader.vue'
export default {
  name: 'GroupSetting',
  data () {
    return {
      group: {},
      remark: '',
      signature: '',
      me: {},
      list: [],
      show: false,
      show1: false,
      disabled: true
    }
  },
  components: {
    LMHeader
  },
  methods: {
    toTextArea () {
      this.$router.push({ path: '/text', query: { notice: this.group.notice, groupId: this.group.id } })
    },
    searchMsg () {
      this.$router.push({
        path: '/message/search',
        query: {
          isGroup: true,
          otherId: this.$route.query.otherId,
          userId: this.$store.state.userId
        }
      })
    },
    delMsg () {
      this.$axios.delete('/message/batch', {
        params: {
          isGroup: true,
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
    handleShow () {
      this.show = true
    },
    cancel () {
      this.show = false
      this.remark = this.me.name
    },
    handleShow1 () {
      this.show1 = true
    },
    cancel1 () {
      this.show1 = false
      this.signature = this.group.signature
    },
    getGroupInfo () {
      this.$axios.get('/group/info', {
        params: {
          groupId: this.$route.query.otherId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.group = data.data
          this.signature = this.group.signature
        }
      })
      this.$axios.get('/member', {
        params: {
          groupId: this.$route.query.otherId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.list = data.data
          this.me = this.list.filter(item => this.$store.state.userId === item.userId)[0]
          this.remark = this.me.name
          if (this.me.grade === 2) {
            this.disabled = false
          }
        }
      })
    },
    delGroup () {
      if (this.me.grade === 2) {
        this.$axios.delete('/group', {
          params: {
            groupId: this.$route.query.otherId
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.$router.push({ path: '/home' })
          }
        })
      } else {
        this.$axios.delete('/member', {
          params: {
            groupId: this.$route.query.otherId,
            userId: this.$store.state.userId
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.$router.push({ path: '/home' })
          }
        })
      }
    },
    toGroup () {
      this.$router.push({ path: '/groupinfo', query: { groupId: this.$route.query.otherId } })
    },
    handleRemark () {
      this.$axios.put('/member/name', {
        groupId: this.$route.query.otherId,
        userId: this.$store.state.userId,
        name: this.remark
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.me.name = this.remark
        }
      })
    },
    handleSignature () {
      this.$axios.put('/group/signature', {
        groupId: this.$route.query.otherId,
        signature: this.signature
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.group.signature = this.signature
        }
      })
    },
    handleGrade (userId, grade) {
      this.$axios.put('/member/grade', {
        groupId: this.$route.query.otherId,
        userId: userId,
        grade: grade
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {}
      })
    }
  },
  created () {
    this.getGroupInfo()
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
