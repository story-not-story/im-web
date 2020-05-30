<template>
  <div class="invitationlist" ref="wrapper">
    <div class="first-child">
      <div class="letter" v-if="friendlist.length > 0">好友申请</div>
      <div class="friend" v-for="item in friendlist" :key="item.id" @click="handleClick(item.id, false)">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc border-topbottom">
          <div class="info">
            <div class="remark" v-text="item.remark">胡君</div>
            <div class="word" v-text="item.message">我是胡君，有事找你</div>
          </div>
          <div class="result" v-text="item.isAccepted === true ? '已同意' : (item.isAccepted === false ? '已拒绝' : '待处理')">已添加</div>
        </div>
      </div>
      <div class="letter" v-if="todofriendlist.length > 0">todo好友申请</div>
      <div class="friend" v-for="item in todofriendlist" :key="item.id" @click="handleClick(item.id, false)">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc border-topbottom">
          <div class="info">
            <div class="remark" v-text="item.remark">胡君</div>
            <div class="word" v-text="item.message">我是胡君，有事找你</div>
          </div>
          <div class="result" v-text="item.isAccepted === true ? '已同意' : (item.isAccepted === false ? '已拒绝' : '待处理')">已添加</div>
        </div>
      </div>
      <div class="letter" v-if="grouplist.length > 0">群申请</div>
      <div class="friend" v-for="item in grouplist" :key="item.id" @click="handleClick(item.id, true)">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc border-topbottom">
          <div class="info">
            <div class="word" v-text="item.message">我是胡君，有事找你</div>
          </div>
          <div class="result" v-text="item.isAccepted === true ? '已同意' : (item.isAccepted === false ? '已拒绝' : '待处理')">已添加</div>
        </div>
      </div>
      <div class="letter" v-if="todogrouplist.length > 0">todo群申请</div>
      <div class="friend" v-for="item in todogrouplist" :key="item.id" @click="handleClick(item.id, true)">
        <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
        <div class="desc border-topbottom">
          <div class="info">
            <div class="word" v-text="item.message">我是胡君，有事找你</div>
          </div>
          <div class="result" v-text="item.isAccepted === true ? '已同意' : (item.isAccepted === false ? '已拒绝' : '待处理')">已添加</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'Invitation',
  data () {
    return {
      friendlist: [],
      todofriendlist: [],
      grouplist: [],
      todogrouplist: []
    }
  },
  created () {
    this.$axios.get('/invite/friend', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.friendlist = data.data.invitationList
        this.todofriendlist = data.data.todoList
      }
    })
    this.$axios.get('/apply/group/list', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.grouplist = data.data.applyList
        this.todogrouplist = data.data.toDoList
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
  },
  methods: {
    handleClick (id, isGroup) {
      this.$router.push({ path: '/apply/detail', query: { id: id, isGroup: isGroup } })
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
  .invitationlist
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
        display: flex
        .info
          flex: 1
          .remark
            padding-top: .2rem
            font-size: $fz
          .word
            font-size: .2rem
            padding-top: .1rem
            color: $grey
        .result
          float: right
          padding-right: .1rem
          line-height: 1.2rem
</style>
