<template>
  <div class="login">
    <LoginHeader></LoginHeader>
    <LoginContent></LoginContent>
  </div>
</template>
<script>
import LoginHeader from './components/LoginHeader.vue'
import LoginContent from './components/LoginContent.vue'
export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginContent
  }
}
</script>
<style lang="stylus" scoped>
</style>
