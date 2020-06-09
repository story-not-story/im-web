<template>
  <div class="header">
    <div class="iconfont search-icon" v-if="show" @click="handleClick">&#xe8b9; 搜索</div>
    <div class="input" v-else>
      <div class="input-left" >
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
      text: '',
      show: true
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
      Bus.$emit('searchmsg', this.text.trim())
    }
  },
  created () {
    if (this.$route.query.text) {
      this.show = false
      this.text = this.$route.query.text
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
    height: $height
    display: flex
    align-items: center
    .search-icon
      height: .7rem
      width: 100%
      background: #fff
      color: $grey
      border-radius: $radius
      line-height: .7rem
      text-align: center
    .input
      height: .7rem
      width: 100%
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
        line-height: $height
</style>
