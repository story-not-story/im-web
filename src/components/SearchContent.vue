<template>
  <div class="friendlist" ref="wrapper">
    <div class="first-child">
      <div class="letter border-topbottom">人</div>
      <div class="friend border-topbottom">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc">
          <div class="remark">胡君</div>
          <div class="word">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
      <div class="friend">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc">
          <div class="remark">胡君</div>
          <div class="word">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
      <div class="iconfont border-topbottom more">查看更多&#xe603;</div>
      <div class="letter border-topbottom">群</div>
      <div class="friend border-topbottom">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc">
          <div class="remark">胡君</div>
          <div class="word">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
      <div class="friend">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc">
          <div class="remark">胡君</div>
          <div class="word">[手机在线] 不惧风雨前进</div>
        </div>
      </div>
      <div class="iconfont border-topbottom more">查看更多&#xe603;</div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SearchContent',
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
  .friendlist
    position: absolute
    overflow: hidden
    top: 1.6rem
    right: 0
    bottom: 0
    left: 0
    .letter
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
          font-size: .5rem
        .word
          font-size: .2rem
          padding-top: .1rem
          color: $grey
</style>
