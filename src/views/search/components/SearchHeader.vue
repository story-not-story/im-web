<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid">
      <div class="btn-left" @click="handleFlag" :style="{ 'background-color': (flag ? '#fff' : bgcolor), 'color': (flag ? bgcolor : '#fff') }">找人</div>
      <div class="btn-right" @click="handleFlag" :style="{ 'background-color': (flag ? bgcolor : '#fff'), 'color': (flag ? '#fff' : bgcolor) }">找群</div>
    </div>
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
  name: 'SearchHeader',
  data () {
    return {
      show: true,
      text: '',
      flag: true,
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
    handleBack () {
      this.$router.go(-1)
    },
    handleEnter () {
      if (this.text.trim() !== '') {
        Bus.$emit('search', this.text)
      }
    },
    handleFlag (event) {
      if (this.flag ^ event.target.className === 'btn-left') {
        this.flag = !this.flag
        this.text = ''
        Bus.$emit('flag')
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
      display: flex
      justify-content: center
      align-items: center
      .btn-left
        height: .6rem
        line-height: .6rem
        border-radius: $radius 0 0 $radius
        padding-left: $pl
        background-color: #fff
        color: $bgcolor
        border: 2px solid #fff
      .btn-right
        height: .6rem
        line-height: .6rem
        border-radius: 0 $radius $radius 0
        padding-right: $pl
        color: #fff
        background-color: $bgcolor
        border: 2px solid #fff
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
          flex: 2
        .text
          flex: 21
          height: .7rem
          margin-right: 5%
          font-size: .32rem
        .clear-icon
          flex: 2
      .input-right
        width: 1rem
        font-size: .4rem
        line-height: .8rem
</style>
