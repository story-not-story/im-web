<template>
  <div class="info border-bottom">
    <div class="label">
      <slot name="key"></slot>
    </div>
    <div>
      <slot name="value"></slot>
      <span class="iconfont icon">&#xe637;</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Text'
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .border-bottom
    &:before
      border-color: $grey
  .info
    font-size: .3rem
    height: 1rem
    line-height: 1rem
    margin: 0 .2rem
    display: flex
    justify-content: space-between
    .label
      color: $grey
    .icon
      color: $grey
</style>
