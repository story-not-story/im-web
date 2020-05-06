<template>
  <div class="group" ref="wrapper">
    <div class="first-child">
      <div v-for="(value,name,index) in map" :key="index">
        <div class="title" @click="handleClick(index)"><!--v-text会覆盖掉标签内所有内容，如果标签内有标签，用{{}}-->
          <span class="iconfont" v-if="showlist[index]">&#xe6aa;</span>
          <span class="iconfont" v-else>&#xe69b;</span>
          {{name}}
        </div>
        <div class="dropdown" v-show="showlist[index]">
          <div class="friend" @click="handleMsg(item.id)" v-for="item in value" :key="item.id">
            <img class="img" alt="玉米粥" :src="$imgurl(item.avatar)"/>
            <div class="desc border-topbottom" v-text="item.name">南邮计软</div>
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
  name: 'GroupList',
  data () {
    return {
      map: {},
      showlist: [false, false, false]
    }
  },
  methods: {
    handleClick (index) {
      Vue.set(this.showlist, index, !this.showlist[index])
    },
    handleMsg (id) {
      this.$router.push({ path: '/message', query: { isGroup: true, otherId: id } })
    }
  },
  created () {
    this.$axios.get('/group', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.map = data.data
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
  .group
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
          font-size: .5rem
          line-height: 1.2rem
</style>
