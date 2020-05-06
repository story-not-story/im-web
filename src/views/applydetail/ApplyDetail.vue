<template>
  <div class="applydetail">
    <LM>{{this.$route.query.isGroup ? '群申请' : '好友申请'}}</LM>
    <Detail></Detail>
  </div>
</template>
<script>
import LM from './components/LM.vue'
import Detail from './components/Detail.vue'
export default {
  name: 'ApplyDetail',
  components: {
    LM,
    Detail
  }
}
</script>
<style lang="stylus" scoped></style>
