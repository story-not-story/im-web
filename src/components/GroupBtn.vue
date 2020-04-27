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
