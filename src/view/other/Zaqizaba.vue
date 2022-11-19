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
</template>

<script>
export default {
  name: 'Zaqizaba',
  methods: {
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
</style>