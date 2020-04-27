<template>
  <div class="alphabet">
      <div class="item" v-for="(value, name) in map" :key="name" v-text="name" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @click="handleLetterClick" :ref="name"></div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'Alphabet',
  props: {
    map: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  created () {
    Bus.$on('change-map', this.changeMap)
  },
  updated () {
    const a = Object.keys(this.map)[0]
    this.startY = this.$refs[a][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      Bus.$emit('changeletter', e.target.innerText)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 86
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            Bus.$emit('changeletter', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    },
    changeMap (map) {
      this.map = map
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .alphabet
    position: absolute
    display: flex
    flex-direction: column
    justify-content: center
    top: 1.6rem
    right: 0
    bottom: .8rem
    width: .4rem
    .item
      line-height: .38rem
      text-align: center
      color: $bgcolor
</style>
