<template>
  <div class="label" ref="wrapper">
    <div class="first-child">
      <div :key="label.id" v-for="(label,index) in labelList">
        <div class="title" @click="handleClick(index)"><!--v-text会覆盖掉标签内所有内容，如果标签内有标签，用{{}}-->
          <span class="iconfont" v-if="showlist[index]">&#xe6aa;</span>
          <span class="iconfont" v-else>&#xe69b;</span>
          {{label.name}}
        </div>
        <div class="dropdown" v-show="showlist[index]">
          <div class="friend" @click="handleFriend" v-for="friend in label.friendList" :key="friend.friendId">
            <img class="img" alt="玉米粥" :src="$imgurl(friend.avatar)"/>
            <div class="desc border-topbottom">
              <div class="remark" v-text="friend.remark">胡君</div>
              <div class="word" v-text="friend.signature">[手机在线] 不惧风雨前进</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
export default {
  name: 'Label',
  data () {
    return {
      showlist: [],
      labelList: []
    }
  },
  methods: {
    handleClick (index) {
      Vue.set(this.showlist, index, !this.showlist[index])
    },
    handleFriend () {
      this.$router.push({ path: '/user' })
    }
  },
  created () {
    this.$axios.get('/label/friendlist', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.labelList = data.data.labelList
        const size = this.labelList.length
        this.showlist = Array(size).fill(false)
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
  .label
    position: absolute
    overflow: hidden
    top: 1.6rem
    right: 0
    bottom: .8rem
    left: 0
    padding-left: .2rem
    .title
      height: .75rem
      line-height: .75rem
      font-size: .4rem
    .dropdown
      padding-left: $pl
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
