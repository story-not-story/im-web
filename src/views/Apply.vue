<template>
  <div class="apply">
    <ApplyHeader></ApplyHeader>
    <ApplyBody></ApplyBody>
  </div>
</template>
<script>
import ApplyHeader from 'components/ApplyHeader'
import ApplyBody from 'components/ApplyBody'
export default {
  name: 'Apply',
  components: {
    ApplyHeader,
    ApplyBody
  }
}
</script>
<style lang="stylus" scoped></style>
