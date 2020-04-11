<template>
  <div class="header">
    <div class="iconfont logo">&#xe607;</div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'LoginHeader'
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
    .header
      height: 1.6rem
      background-color: $bgcolor
      background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
      position: relative
      .logo
        color: $bgcolor
        text-align: center
        font-size: 1.2rem
        border-radius: 50%
        background-clip: content-box,padding-box
        background-image: radial-gradient(#fff, #fff), radial-gradient(circle, rgba(93, 211, 250, 1), rgba(93, 211, 250, 0.25))
        background-color: #fff
        padding: .1rem
        position: relative
        top: .9rem
        width: 1.2rem
        margin: 0 auto
        z-index: 1
</style>
