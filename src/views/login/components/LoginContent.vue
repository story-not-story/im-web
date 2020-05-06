<template>
  <div class="body">
    <form ref="form" name="user" class="form" method="post">
      <div class="wrapper">
        <label v-text="flag ? 'IM号' : '昵称'"></label>
        <input v-model.lazy="id" class="content" type="text" name="id" placeholder="用户名"/>
      </div>
      <div class="wrapper">
        <label>密码</label>
        <input v-model.lazy="password" class="content" type="password" name="password" placeholder="密码(字母数字6-16位)"/>
      </div>
      <div class="captcha">
        <Captcha @click.native="handleCaptcha" :identifyCode="identifyCode"></Captcha>
        <input v-model.lazy="captcha" class="input" type="text" name="captcha" placeholder="4位验证码" />
      </div>
      <div class="wrapper">
        <input class="mr submit" type="button" value="登录" @click="handleClick"/>
        <input class="submit" type="button" value="注册" @click="handleClick"/>
      </div>
      <div class="error" v-show="errormsg !== ''"> {{errormsg}}</div>
    </form>
  </div>
</template>
<script>
import Captcha from 'components/Captcha.vue'
export default {
  name: 'LoginContent',
  data () {
    return {
      flag: true,
      identifyCode: '',
      errormsg: '',
      id: '',
      password: '',
      captcha: '',
      click: true
    }
  },
  components: {
    Captcha
  },
  mounted () {
    this.randomCaptcha()
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    randomCaptcha () {
      var code = ''
      for (let i = 0; i < 4; i++) {
        const a = this.randomNum(0, 100)
        if (a > 50) {
          const i = this.randomNum(0, 25)
          code = String.fromCharCode((65 + i)) + code
        } else {
          const i = this.randomNum(0, 9)
          code = String.fromCharCode((48 + i)) + code
        }
      }
      this.identifyCode = code
      console.log(this.identifyCode)
    },
    handleClick (event) {
      if (this.flag ^ event.target.value === '登录') {
        this.flag = !this.flag
        this.id = ''
        this.password = ''
        this.captcha = ''
      } else {
        if (this.id === '') {
          this.errormsg = this.flag ? 'IM号不能为空' : '昵称不能为空'
        } else if (this.password === '') {
          this.errormsg = '密码不能为空'
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password)) {
          this.errormsg = '密码不符合规则'
        } else if (this.captcha !== this.identifyCode) {
          this.errormsg = '验证码错误'
        } else {
          this.errormsg = ''
          if (this.click) {
            this.click = false
            this.$axios({
              method: 'post',
              url: this.flag ? '/login' : '/register',
              data: {
                id: this.id,
                name: this.id,
                password: this.password
              }
            }).then((res) => {
              this.click = true
              const data = res.data
              if (data.code === 0) {
                if (this.flag) {
                  this.$store.commit('changeUserId', this.id)
                  this.$router.push({ path: '/home' })
                  this.$ws.creatWebSocket()
                } else {
                  this.flag = !this.flag
                  this.id = data.data.userId
                  console.log('id:' + data.data.userId)
                  this.password = ''
                  this.captcha = ''
                  this.randomCaptcha()
                }
              } else if (data.code === 4) {
                this.errormsg = '用户未注册'
              }
            })
          }
        }
      }
    },
    handleCaptcha () {
      this.randomCaptcha()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
    input::placeholder
      color: #fff
    .body
      position: absolute
      left: 0
      right: 0
      top: 1.6rem
      bottom: 0
      background-image: url(../../../assets/yumizhou.jpeg)
      background-repeat:no-repeat
      background-size:100% 100%
      .form
        margin: auto
        width: 4.7rem
        background-color: rgba(240, 255, 255, 0.25)
        padding: .2rem
        border-radius: .1rem
        position: relative
        top: 50%
        transform: translateY(-50%)
        font-size: .5rem
        .error
          color: red
          text-align: center
          font-size: .3rem
        .captcha
          text-align: center
          display: flex
          align-items: center
          justify-content: center
          .input
            height: .75rem
            width: 1.7rem
            font-size: .2rem
            padding-left: $pl
            margin-left: .2rem
            border-radius: .1rem
            background-color: rgba(0, 0, 0, 0.25)
            color: #fff
        .wrapper
          text-align: center
          color: #fff
          .content
            height: .75rem
            padding-left: $pl
            border-radius: .1rem
            width: 2.5rem
            margin: .1rem 0 .1rem .1rem
            background-color: rgba(0, 0, 0, 0.25)
            color: #fff
            font-size: .2rem
          .submit
            width: 1.8rem
            border-radius: .1rem
            margin: .1rem 0
            background-color: $bgcolor
            background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
            color: #fff
          .mr
            margin-right: .2rem
</style>
