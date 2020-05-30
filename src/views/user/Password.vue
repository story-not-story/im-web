<template>
  <div class="me">
    <PasswordHeader></PasswordHeader>
    <PasswordBody></PasswordBody>
  </div>
</template>
<script>
import PasswordHeader from './components/PasswordHeader.vue'
import PasswordBody from './components/PasswordBody.vue'
export default {
  name: 'Password',
  components: {
    PasswordHeader,
    PasswordBody
  }
}
</script>
<style lang="stylus" scoped></style>
