<template>
  <div class="header">
    <div class="iconfont search-icon" v-if="show" @click="handleClick">&#xe8b9; 搜索</div>
    <div class="input" v-else>
      <div class="input-left">
        <div class="iconfont search-icon2">&#xe8b9;</div>
        <input class="text" type="text" name="search" placeholder="搜索" v-model.trim="text" @keyup.enter="handleEnter"/>
        <div class="iconfont clear-icon" v-show="clearshow" @click="handelClear">&#xe635;</div>
      </div>
      <div class="input-right" @click="handleClick">取消</div>
    </div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'SearchInput',
  data () {
    return {
      show: true,
      text: '',
      bgcolor: '#59ccfa'
    }
  },
  methods: {
    handleClick () {
      this.show = !this.show
    },
    handelClear () {
      this.text = ''
    },
    handleEnter () {
      if (this.text.trim() !== '') {
        Bus.$emit('search-friend', this.text)
      }
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
    height: .8rem
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    font-size: .5rem
    position: relative
    .search-icon
      height: .7rem
      background: #fff
      color: $grey
      border-radius: $radius
      line-height: .7rem
    .input
      height: .7rem
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
