<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid">{{title}}</div>
    <div class="iconfont search-icon" v-if="show" @click="handleClick">&#xe8b9; 搜索</div>
    <div class="input" v-else>
      <div class="input-left">
        <div class="iconfont search-icon2">&#xe8b9;</div>
        <input class="text" type="text" name="search" placeholder="搜索" v-model="text"/>
        <div class="iconfont clear-icon" v-show="clearshow" @click="handelClear">&#xe635;</div>
      </div>
      <div class="input-right" @click="handleClick">取消</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchHeader',
  props: {
    title: String
  },
  data () {
    return {
      show: true,
      text: ''
    }
  },
  methods: {
    handleClick () {
      this.show = !this.show
    },
    handelClear () {
      this.text = ''
    },
    handleBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    clearshow () {
      return this.text !== ''
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    height: 1.6rem
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    font-size: .5rem
    position: relative
    .left
      position: absolute
      left : 0
      top: 0
      height: 50%
      line-height: .8rem
    .mid
      height: 50%
      line-height: .8rem
    .search-icon
      height: .7rem
      margin-top: .05rem
      background: #fff
      color: $grey
      border-radius: $radius
      line-height: .7rem
    .input
      height: 50%
      margin-left: .1rem
      display: flex
      align-items: center
      .input-left
        height: .7rem
        flex: 1
        background: #fff
        color: $grey
        border-radius: $radius
        display: flex
        align-items: center
        padding: 0 .1rem
        .search-icon2
          float: left
          width: 8%
        .text
          flex: 1
          height: .7rem
          margin-right: 5%
          font-size: .32rem
        .clear-icon
          width: 8%
          float: right
      .input-right
        width: 1rem
        float: right
        font-size: .4rem
        line-height: .8rem
</style>
