<template>
  <h5>1.禁止复制、粘贴、剪切功能</h5>
  <div class="testPaste">
    <textarea id="testPaste1" name="testPaste1" cols="55" rows="5" 
      @paste.capture.prevent="handPaste"
      @copy.capture.prevent="handCopy"
      @cut.capture.prevent="handCut">禁止复制、粘贴、剪切文本框1
    </textarea>
    <br>
    <input type="text" id="testPaste2" 
      @paste="handPaste2" @copy="handCopy2" @cut="handCut2"
      value="禁止复制、粘贴、剪切文本框2">
  </div>

  <h5>2.禁止右击选择功能</h5>
  <div class="stopMouseRightClick" @contextmenu="stopMouseRightClick"></div>
  <div class="stopMouseRightClick2" @contextmenu.prevent="stopMouseRightClick2"></div>

  <h5>3.结合已写文字来改变应该要输入的文字</h5>
  <div>
    <span class="first" href="first">{{firstStr}}</span>
    <span class="second" href="second">{{secondStr}}</span>
  </div>
  <textarea id="testPaste3" cols="76" rows="7" ref="testPaste3" v-model="inputStr"></textarea>
</template>

<script>
export default {
  name: 'Zaqizaba',
  data() {
    return {
      firstStr: '',
      secondStr: '',
      inputStr: '',
      fullStr: '当你熬过生活里的苦难，你终究会被苦难成全。生活很苦，熬过去就算赢。',
      commonIndex: -1
    }
  },
  created() {
    // 默认给展示全部未输入字符
    this.secondStr = this.fullStr
  },
  computed: {
    inputStr2() {
      this.inputStr = this.$refs.testPaste3 ? this.$refs.testPaste3.value : ''
      return this.inputStr
    }
  },
  watch: {
    inputStr2(newValue) {
      this.matchInputStr(this.fullStr, newValue)
      this.secondStr = this.fullStr.substring(this.commonIndex + 1)
    }
  },
  methods: {
    // 根据输入的字符匹配要求输入的字符
    matchInputStr(value1, value2) {
      this.firstStr = ''
      const length = Math.max(value1.length, value2.length)
      for (let i = 0; i < length; i++) {
        if (value1[i] === value2[i]) {
          this.firstStr += value2[i]
          this.commonIndex = i
        } else {
          // 如果出现在首位就不符合的情况，重置为初始状态
          if (i === 0) {
            this.firstStr = ''
            this.secondStr = this.fullStr
            this.commonIndex = -1
          }
          break
        }
      }
    },
    handPaste() {
      console.log('------handPaste------')
      return false
    },
    handCopy() {
      console.log('------handCopy------')
      return false
    },
    handCut() {
      console.log('-----handCut-------')
      return false
    },
    // 此方法通过e来调用方法，实际和@XXX.prevent是一样的，
    handPaste2(e) {
      console.log('-----handPaste2-------')
      e.preventDefault()
    },
    handCopy2(e) {
      console.log('-----handCopy2-------')
      e.preventDefault()
    },
    handCut2(e) {
      console.log('-----handCut2-------')
      e.preventDefault()
    },
    stopMouseRightClick(e) {
      console.log('-----stopMouseRightClick-------')
      e.preventDefault()
    },
    stopMouseRightClick2() {
      console.log('-----stopMouseRightClick2-------')
      return false
    }
  }
}
</script>

<style scoped>
h5 {
  text-align: center;
  margin: 10px 0;
}
.testPaste {
  text-align: center;
  background-color: red;
}

#testPaste1 {
  vertical-align: middle;
  background-color: yellow;
}

#testPaste2 {
  display: inline-block;
  width: 400px;
  height: 70px;
}

.stopMouseRightClick {
  height: 50px;
  background-color: orange;
}
.stopMouseRightClick2 {
  height: 50px;
  background-color: skyblue;
}

.first {
  font-size: 14px;
  color: black;
}
.second {
  font-size: 30px;
  color: red;
}

#testPaste3 {
  font-family: '微软雅黑';
}
</style>