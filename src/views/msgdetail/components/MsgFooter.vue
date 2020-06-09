<template>
  <div class="footer">
    <div class="line1">
      <div class="left" @click="handleClick">
        <div class="iconfont myicon" v-if="show">&#xe608;</div>
        <div class="iconfont myicon" v-else>&#xe7e2;</div>
      </div>
      <div class="input">
        <input class="text" type="text" name="search" @keyup.enter="handleEnter"/>
      </div>
      <div class="right">
        <span class="iconfont myicon" @click="handleEmoji">&#xe60b;</span>
        <span class="iconfont myicon" @click="handleMore">&#xe726;</span>
      </div>
    </div>
    <div class="dropdown" v-show="emojishow">
      <div class="emoji" v-for="item in emojiarr" :key="item">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#' + item"></use>
        </svg>
      </div>
    </div>
    <div class="dropdown" v-show="moreshow">
      <div class="iconfont myicon less" @click="chooseImg">&#xe629;</div>
      <div class="iconfont myicon more">&#xe675;</div>
      <div class="iconfont myicon">&#xe6c6;</div>
      <div class="iconfont myicon">&#xe963;</div>
      <div class="iconfont myicon">&#xe62a;</div>
      <div class="iconfont myicon" @click="chooseFile">&#xe611;</div>
      <div class="iconfont myicon">&#xe613;</div>
      <div class="iconfont myicon">&#xe6df;</div>
    </div>
    <input v-show="false" type="file" name="imgFile" ref="imgFile" accept="image/*" multiple="multiple" @change="sendImg">
    <input v-show="false" type="file" name="allFile" ref="allFile" multiple="multiple" @change="sendFile">
  </div>
</template>
<script>
import Bus from '@/bus.js'
import SparkMD5 from 'spark-md5/spark-md5.js'
export default {
  name: 'MsgFooter',
  data () {
    return {
      worker: null,
      show: true,
      emojishow: false,
      moreshow: false,
      emojiarr: [
        'icon-damuzhi', 'iconemojibiaoqing-1', 'iconemojibiaoqing-2', 'iconemojibiaoqing-3',
        'iconemojibiaoqing-6', 'iconemojibiaoqing-7', 'iconemojibiaoqing-10', 'iconemojibiaoqing-12',
        'iconemojibiaoqing-13', 'iconemojibiaoqing-14', 'iconemojibiaoqing-16', 'iconemojibiaoqing-17',
        'iconemojibiaoqing-18', 'iconemojibiaoqing-19', 'iconemojibiaoqing-20', 'iconemojibiaoqing-21',
        'iconemojibiaoqing-22', 'iconemojibiaoqing-24', 'iconemojibiaoqing-25', 'iconemojibiaoqing-27',
        'iconemojibiaoqing-28', 'iconemojibiaoqing-29', 'iconemojibiaoqing-30', 'iconemojibiaoqing-32',
        'iconemojibiaoqing-33', 'iconemojibiaoqing-34', 'iconemojibiaoqing-35', 'iconemojibiaoqing-36',
        'iconemojibiaoqing-42', 'iconemojibiaoqing-110', 'iconemojibiaoqing-211', 'iconbiaoqingkunhuo'
      ]
    }
  },
  destroyed () {
    this.worker = null
  },
  methods: {
    // 生成文件 hash（web-worker）
    // calculateHash (fileChunkList) {
    //   const self = this
    //   return new Promise(resolve => {
    //     // 添加 worker 属性
    //     self.worker = new Worker('@/hash.js')
    //     self.worker.postMessage({ fileChunkList })
    //     self.worker.onmessage = e => {
    //       const { hash } = e.data
    //       // this.hashPercentage = percentage
    //       if (hash) {
    //         resolve(hash)
    //       }
    //     }
    //   })
    // },
    calculateHash (fileChunkList) {
      this.worker = this.$worker.run(fileChunkList => {
        const spark = new SparkMD5.ArrayBuffer()
        let count = 0
        const loadNext = index => {
          const reader = new FileReader()
          reader.onload = e => {
            count++
            console.log('loadNext')
            console.log(e.target.result)
            spark.append(e.target.result)
            if (count === fileChunkList.length) {
              return spark.end()
            } else {
              // 递归计算下一个切片
              loadNext(count)
            }
          }
          reader.readAsArrayBuffer(fileChunkList[index])
        }
        loadNext(0)
      }, [fileChunkList]).then((res) => {
        console.log('hash:' + res)
        return res
      }).catch((res) => {
        console.log('hash failed')
        return ''
      })
    },
    chooseImg () {
      this.$refs.imgFile.dispatchEvent(new MouseEvent('click'))
    },
    chooseFile () {
      this.$refs.allFile.dispatchEvent(new MouseEvent('click'))
    },
    sendImg () {},
    sendFile () {
      const sliceSize = 262144
      const files = this.$refs.allFile.files
      const self = this
      files.forEach((file) => {
        const fileInfo = {
          content: file.name,
          isGroup: self.$route.query.isGroup,
          senderId: self.$store.state.userId,
          receiverId: self.$route.query.otherId,
          type: 3
        }
        let cur = 0
        const slicelist = []
        while (cur < file.size) {
          const slice = file.slice(cur, cur + sliceSize)
          slicelist.push(slice)
          cur += sliceSize
        }
        let hash = ''
        hash = self.calculateHash(slicelist)
        self.$axios.get('/file/isExists', {
          params: {
            name: hash
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            if (data.data === true || typeof data.data == 'string' && data.data === 'true') {// eslint-disable-line
              fileInfo.content = file.name + ':' + hash
              self.$ws.websocket.send(JSON.stringify(fileInfo))
            } else {
              const length = slicelist.length
              slicelist.forEach((chunk, index) => {
                const reader = new FileReader()
                reader.onload = event => {
                  console.log('chunk', event.target.result)
                  const data = {
                    chunk: event.target.result,
                    name: hash + '-' + index,
                    total: length
                  }
                  self.$ws.websocket.send(JSON.stringify(data))
                }
                reader.readAsArrayBuffer(chunk)
              })
            }
          }
        })
        // self.$ws.websocket.send(JSON.stringify(fileInfo))
      })
    },
    handleClick () {
      this.show = !this.show
    },
    handleEmoji () {
      if (!this.emojishow && this.moreshow) {
        this.moreshow = false
        this.emojishow = true
      } else {
        this.emojishow = !this.emojishow
        Bus.$emit('change-height')
      }
    },
    handleMore () {
      if (this.emojishow && !this.moreshow) {
        this.emojishow = false
        this.moreshow = true
      } else {
        this.moreshow = !this.moreshow
        Bus.$emit('change-height')
      }
    },
    handleEnter (event) {
      var str = event.target.value
      if (str.trim() === '') {
        return
      }
      const data = {
        content: str,
        isGroup: this.$route.query.isGroup,
        senderId: this.$store.state.userId,
        receiverId: this.$route.query.otherId
      }
      this.$ws.websocket.send(JSON.stringify(data))
      event.target.value = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .footer
    position: absolute
    bottom: 0
    width: 100%
    .line1
      display: flex
      align-items: center
      line-height: $height
      background-color: $bgcolor
      background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
      color: #fff
      text-align: center
      .left
        width: .6rem
        float: left
        margin-left: .1rem
        .myicon
          font-size: .6rem
      .input
        flex: 1
        height: .64rem
        line-height: .64rem
        margin: .1rem
        background: #fff
        color: $grey
        border-radius: $radius
        overflow: hidden
        .text
          text-align: center
          width: 100%
          height: 100%
      .right
        width: 1.4rem
        float: right
        color: #fff
        .myicon
          font-size: .6rem
          margin-right: .1rem
    .dropdown
      width: 100%
      height: 1.6rem
      background: #fff
      .myicon
        width: 25%
        height: 50%
        color: $bgcolor
        float: left
        text-align: center
        font-size: .6rem
        line-height: $height
      .emoji
        width: 12.5%
        height: 25%
        float: left
        text-align: center
        line-height: .4rem
      .less
        font-size: $fz
      .more
        font-size: .7rem
</style>
