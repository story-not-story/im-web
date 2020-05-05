<template>
  <div>
    <div class="header">
      <div class="iconfont left" @click="handleBack">&#xe622;</div>
      <div class="mid">分组管理</div>
      <div class="iconfont right" @click="show = !show">&#xe879;</div>
      <!-- html属性、事件里访问本地data不加this，访问全局Vue要加this -->
    </div>
    <div class="labellist">
      <div class="info border-bottom" v-for="(item, index) in list" :key="item.id">
        <div class="iconfont icon" @click="handleDel(item.id, index)">&#xe635;</div>
        <input class="content" type="text" :value="item.name" @keyup.enter="handleEnter(item.id, $event)">
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom" v-show="show">
        <div class="iconfont icon" @click="handleDel(null, null)">&#xe635;</div>
        <input class="content" v-model.lazy="newlabel" type="text" placeholder="新分组" @keyup.enter="handleEnter(null, $event)">
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LabelList',
  data () {
    return {
      list: [],
      show: false,
      newlabel: ''
    }
  },
  created () {
    this.$axios.get('/label', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.list = data.data
      }
    })
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    handleEnter (id, event) {
      if (id === null) {
        this.$axios.post('/label', {
          userId: this.$store.state.userId,
          name: event.target.value
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.list.push({
              id: data.data.id,
              name: event.target.value,
              userId: this.$store.state.userId
            })
            this.newlabel = ''
            this.show = !this.show
          }
        })
      } else {
        this.$axios.put('/label', {
          id: id,
          name: event.target.value
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
          }
        })
      }
    },
    handleDel (id, index) {
      if (id === null) {
        this.newlabel = ''
        this.show = !this.show
      } else {
        this.$axios.delete('/label', {
          params: {
            id: id
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            this.list.splice(index, 1)
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
  .header
    height: .8rem
    align-items: center
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    display: flex
    font-size: .5rem
    .mid
      flex: 1
    .left
      padding-left: $pl
      width: .7rem
    .right
      width: .7rem
      padding-right: $pl
  .info
    height: 1rem
    // line-height: 1rem// .icon继承了line-height的情况下设置宽高会导致overflow内容不显示，产生不显示效果
    margin: 0 .2rem
    color: $grey
    display: flex
    align-items: center
    .icon
      font-size: .4rem
      margin-right: .2rem
    .content
      font-size: .4rem
      width: 100%
</style>
