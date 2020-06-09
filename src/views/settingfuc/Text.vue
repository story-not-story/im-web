<template>
  <div class="apply">
    <TextHeader></TextHeader>
    <TextInput></TextInput>
    <!-- 同个页面中js代码会混在一起，函数名相同会都调用 -->
  </div>
</template>
<script>
import TextHeader from './components/TextHeader'
import TextInput from './components/TextInput'
export default {
  name: 'Text',
  components: {
    TextHeader,
    TextInput
  }
}
</script>
<style lang="stylus" scoped></style>
