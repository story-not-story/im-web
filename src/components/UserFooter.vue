<template>
  <div class="footer">发消息</div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'UserFooter'
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .footer
    position: absolute
    bottom: 0
    width: 100%
    height: .8rem
    background: $bgcolor
    color: #fff
    text-align: center
    font-size: .6rem
    line-height: .8rem
</style>
