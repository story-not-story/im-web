<template>
  <div class="alphabet">
      <div class="item" v-for="item in letters" v-text="item" :key="item"></div>
      <!-- <li class="item" v-for="item in letters" v-text="item" :key="item" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @click="handleLetterClick" :ref="item"></li> -->
  </div>
</template>
<script>
export default {
  name: 'Alphabet',
  data () {
    return {
      letters: ['*', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
    }
  }
  // data() {
  //   return {
  //     touchStatus: false,
  //     startY: 0,
  //     timer: null
  //   }
  // },
  // props: {
  //   city: Object
  // },
  // updated() {
  //   this.startY = this.$refs['A'][0].offsetTop
  // },
  // computed: {
  //   letters() {
  //     const letters = []
  //     letters.push('*')
  //     for (let i in this.city) {
  //       letters.push(i)
  //     }
  //     letters.push('#')
  //     return letters
  //   }
  // },
  // methods: {
  //   handleLetterClick(e) {
  //     this.$emit('change', e.target.innerText)
  //   },
  //   handleTouchStart() {
  //     this.touchStatus = true
  //   },
  //   handleTouchMove(e) {
  //     if (this.touchStatus) {
  //       if (this.timer) {
  //         clearTimeout(this.timer)
  //       }
  //       this.timer = setTimeout(() => {
  //         const touchY = e.touches[0].clientY - 86
  //         const index = Math.floor((touchY - this.startY) / 20)
  //         if (index >= 0 && index < this.letters.length) {
  //           this.$emit('change', this.letters[index])
  //         }
  //       }, 16)
  //     }
  //   },
  //   handleTouchEnd() {
  //     this.touchStatus = false
  //   }
  // }
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
