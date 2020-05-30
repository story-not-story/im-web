<template>
  <div class="meinfo" ref="wrapper">
    <div class="first-child">
      <div class="me">
        <img class="img" alt="玉米粥" :src="$imgurl(group.avatar)"/>
        <div class="desc border-topbottom">
          <div class="remark" v-text="group.name">胡君</div>
          <div class="userid" v-text="group.id">1209226858</div>
        </div>
      </div>
      <div class="info border-bottom">
        <div class="label">个性签名</div>
        <div class="content" v-text="group.signature">不惧风雨前进 <span class="iconfont icon">&#xe637;</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'GroupInfo',
  data () {
    return {
      group: {}
    }
  },
  // props: {
  //   hotcity: Array,
  //   city: Object,
  //   letter: String
  // },
  // computed: {
  //   ...mapState({
  //     cityname: 'city'
  //   })
  // },
  // methods: {
  //   handleClick(city) {
  //     this.changeCity(city)
  //     this.$router.push('/')
  //   },
  //   ...mapMutations(['changeCity'])
  // },
  created () {
    this.$axios.get('/group/info', {
      params: {
        groupId: this.$route.query.groupId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.group = data.data
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
  .border-topbottom
    &:before
      border-color: $grey
    &:after
      border-color: $grey
  .border-bottom
    &:before
      border-color: $grey
  .meinfo
    position: absolute
    overflow: hidden
    top: .8rem
    right: 0
    bottom: .8rem
    left: 0
    .info
      font-size: .3rem
      height: 1rem
      line-height: 1rem
      margin: 0 .2rem
      display: flex
      justify-content: space-between
      .label
        color: $grey
      .icon
        color: $grey
    .me
      display: flex
      width: 100%
      height: 1.6rem
      .img
        width: 1.4rem
        height: 1.4rem
        float: left
        margin: .1rem
        border-radius: $circle
      .desc
        flex: 1
        padding-left: $pl
        .remark
          padding-top: .2rem
          font-size: $fz
        .word, .userid
          font-size: .2rem
          padding-top: .1rem
          color: #20222e
</style>
