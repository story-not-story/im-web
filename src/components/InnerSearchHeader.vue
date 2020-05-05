<template>
  <div class="header">
    <div class="input-left">
      <div class="iconfont search-icon2">&#xe8b9;</div>
      <input class="text" type="text" name="search" placeholder="搜索" v-model.trim="text" @keyup.enter="handleEnter"/>
      <div class="iconfont clear-icon" v-show="clearshow" @click="handelClear">&#xe635;</div>
    </div>
    <div class="input-right" @click="handleClick">取消</div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'InnerSearchHeader',
  data () {
    return {
      show: true,
      text: ''
    }
  },
  methods: {
    handleClick () {
      this.$router.go(-1)
    },
    handelClear () {
      this.text = ''
    },
    handleEnter () {
      if (this.text.trim() !== '') {
        Bus.$emit('searchsum', this.text)
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
    width: 100%
    color: #fff
    background-color: $bgcolor
    height: 50%
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
      margin-left: .1rem
      padding: 0 .1rem
      .search-icon2
        flex: 2
      .text
        flex: 21
      .clear-icon
        flex: 2
    .input-right
      text-align: center
      width: 1rem
      font-size: .4rem
      line-height: .8rem
</style>
