<template>
  <div class="groupbtn" ref="wrapper">
    <div class="first-child">
      <div class="btn border-topbottom">选择一个群</div>
      <div class="btn border-topbottom">面对面建群</div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'GroupBtn',
  data () {
    return {
      img: require('img/yumizhou.jpeg')
    }
  },
  // handleClick () {
  //   this.$axios.post('/group', {
  //     params: {
  //       userId: this.$store.state.userId,
  //       name:
  //       j
  //     }
  //   })
  // },
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
  .groupbtn
    width: 100%
    // position: absolute
    // overflow: hidden
    // top: 1.6rem
    // right: 0
    // bottom: 0
    // left: 0
    .btn
      margin: 0 .2rem
      padding: .1rem 0
      font-size: .4rem
</style>
