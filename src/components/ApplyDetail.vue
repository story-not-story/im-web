<template>
  <div class="applydetail">
    <div class="user border-bottom">
      <img :src="$imgurl(item.avatar)" class="img" />
      <div class="mid">
        <p class="name" v-text="item.remark">胡君</p>
        <p class="info">女  24岁</p>
      </div>
      <span class="iconfont right">&#xe603;</span>
    </div>
    <div class="validate">
      <label class="label">验证信息 </label>
      <p v-text="item.message">文字</p>
    </div>
    <div class="btn">
      <button type="button" class="item" @click="accept">接受</button>
      <button type="button" class="item" @click="reject">拒绝</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ApplyDetail',
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.$axios.get('/invite/friend/detail', {
      params: {
        id: this.$route.query.id,
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.item = data.data
      }
    })
  },
  methods: {
    accept () {
      if (this.item.isAccepted === null) {
        this.$axios.get('/invite/friend/accept', {
          params: {
            id: this.$route.query.id
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.$router.go(-1)
          }
        })
      }
    },
    reject () {
      if (this.item.isAccepted === null) {
        this.$axios.get('/invite/friend/reject', {
          params: {
            id: this.$route.query.id
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .border-bottom
    &:before
      border-color: $grey
  .applydetail
    font-size: .4rem
    .user
      height: 1.2rem
      display: flex
      align-items: center
      .img
        width: 1rem
        height: 1rem
        margin: .1rem .3rem .1rem .1rem
        border-radius: $circle
      .mid
        flex: 1
        .name
          font-weight: 600
          margin-bottom: .2rem
        .info
          color: $grey
      .right
        width: .4rem
    .validate
      display: flex
      align-items: center
      height: .8rem
      .label
        color: $grey
        margin-right: .3rem
    .btn
      height: .8rem
      display: flex
      justify-content: space-around
      align-items: center
      .item
        background-color: $bgcolor
        border-radius: $radius
        color: #fff
        width: 25%
        height: .4rem
        text-align: center
        line-height: .4rem
</style>
