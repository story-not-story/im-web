<template>
  <div class="friendlist" ref="wrapper">
    <div class="first-child">
      <div v-for="(value, name) in map" :key="name">
        <div class="letter" v-text="name">A</div>
        <div class="friend" @click="handleClick(name, index)" v-for="(item,index) in value" :key="item.friendId">
          <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
          <div class="desc border-topbottom">
            <div class="remark" v-text="item.remark">胡君</div>
            <div class="word" v-text="item.signature">[手机在线] 不惧风雨前进</div>
          </div>
          <div class="iconfont select" v-show="showmap[name] && showmap[name][index]">&#xe813;</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Bus from '@/bus.js'
import Vue from 'vue'
export default {
  name: 'SelectFriend',
  props: {
    map: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showmap: {}
    }
  },
  methods: {
    handleClick (name, index) {
      Vue.set(this.showmap[name], index, !this.showmap[name][index])
    },
    scrollToLetter (letter) {
      const area = this.$refs[letter][0]
      this.scroll.scrollToElement(area)
    },
    filter (text) {},
    changeMap (map) {
      this.map = map
      for (const key in this.map) {
        const size = this.map[key].length
        const list = Array(size).fill(false)
        Vue.set(this.showmap, key, list)
      }
    },
    createGroup () {
      var list = []
      for (const key in this.map) {
        const size = this.map[key].length
        for (var i = 0; i < size; i++) {
          if (this.showmap[key][i]) {
            list.push(this.map[key][i].friendId)
          }
        }
      }
      if (list.length > 1) {
        this.$axios.post('/group', {
          userId: this.$store.state.userId,
          userIdList: list
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.$router.push({
              path: '/message',
              query: {
                isGroup: true,
                otherId: data.data.groupId
              }
            })
          }
        })
      }
    }
  },
  created () {
    Bus.$on('changeletter', this.scrollToLetter)
    Bus.$on('change-map', this.changeMap)
    Bus.$on('search-friend', this.filter)
    Bus.$on('create-group', this.createGroup)
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
    top: 2.8rem
    right: 0
    bottom: 0
    left: 0
    .letter
      padding: .1rem
      background: $grey
    .friend
      display: flex
      width: 100%
      height: 1.2rem
      position: relative
      .select
        position: absolute
        top: 50%
        right: .1rem
        transform: translateY(-50%)
        color: $bgcolor
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
