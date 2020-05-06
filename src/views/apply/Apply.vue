<template>
  <div class="apply">
    <ApplyHeader></ApplyHeader>
    <ApplyBody></ApplyBody>
    <!-- 同个页面中js代码会混在一起，函数名相同会都调用 -->
  </div>
</template>
<script>
import ApplyHeader from './components/ApplyHeader'
import ApplyBody from './components/ApplyBody'
export default {
  name: 'Apply',
  components: {
    ApplyHeader,
    ApplyBody
  }
}
</script>
<style lang="stylus" scoped></style>
