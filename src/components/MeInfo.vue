<template>
  <div class="meinfo" ref="wrapper">
    <div class="first-child">
      <div class="me">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">
          <div class="remark">胡君</div>
          <div class="userid">1209226858</div>
          <div class="word">温州</div>
        </div>
      </div>
      <div class="info border-bottom">
        <div class="label">个性签名</div>
        <div class="content">不惧风雨前进 <span class="iconfont icon">&#xe637;</span></div>
      </div>
      <div class="info border-bottom">
        <div class="label">生日</div>
        <div class="content">0829 <span class="iconfont icon">&#xe637;</span></div>
      </div>
      <div class="info border-bottom">
        <div class="label">年龄</div>
        <div class="content">23 <span class="iconfont icon">&#xe637;</span></div>
      </div>
      <div class="info border-bottom">
        <div class="label">性别</div>
        <div class="content">女 <span class="iconfont icon">&#xe637;</span></div>
      </div>
      <div class="info border-bottom">
        <div class="label">电话</div>
        <div class="content">4534535263 <span class="iconfont icon">&#xe637;</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MeInfo',
  data () {
    return {
      img: require('img/yumizhou.jpeg')
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
  }//,
  // watch: {
  //   letter() {
  //     if (this.letter) {
  //       const area = this.$refs[this.letter][0]
  //       this.scroll.scrollToElement(area)
  //     }
  //   }
  // }
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
          font-size: .5rem
        .word, .userid
          font-size: .2rem
          padding-top: .1rem
          color: #20222e
</style>
