<template>
  <div class="applydetail">
    <LM>{{this.$route.query.isGroup ? '群申请' : '好友申请'}}</LM>
    <ApplyDetail></ApplyDetail>
  </div>
</template>
<script>
import LM from 'components/LM.vue'
import ApplyDetail from 'components/ApplyDetail.vue'
export default {
  name: 'ApplyDetailv',
  components: {
    LM,
    ApplyDetail
  }
}
</script>
<style lang="stylus" scoped></style>
