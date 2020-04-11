<template>
  <div class="friendlist" ref="wrapper">
    <div class="first-child">
      <div class="btn border-topbottom">选择一个群</div>
      <div class="btn border-topbottom">面对面建群</div>
      <div class="letter">A</div>
      <div class="friend">
        <img class="img" alt="玉米粥" :src="img"/>
        <div class="desc border-topbottom">胡君</div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'GroupContent',
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
    bottom: .8rem
    left: 0
    .btn
      margin: 0 .2rem
      padding: .1rem 0
      font-size: .4rem
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
        font-size: .5rem
        line-height: 1.2rem
</style>
