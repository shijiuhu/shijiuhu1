<template>
  <div class="root">
    <div class="nowTime">
      <span v-if="!counting">{{ nowTime }}</span>
      <span v-else>{{ count }}</span>
    </div>
    <div class="button">
      <div class="clock" @click="showNowTime"><span>时钟</span></div>
      <div class="counter" @click="startCount" v-if="!counting"><span>计时器</span></div>
      <div class="stop" @click="stopCount" v-if="counting"><span>{{ stopOrContinue }}</span></div>
      <div class="reset" @click="resetCount" v-if="counting"><span>重置</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElectronicClock',
  data() {
    return {
      nowTime: '',
      count: '00:00:00',
      counting: false,
      setCount: null,
      stopOrContinue: '暂停',
      periodTime: 0,
      lastPeriodTime: 0
    }
  },
  created() {
    // 打开页面让其展示现在的时间
    this.showNowTime()
  },
  methods: {
    // 开始计时
    startCount() {
      this.counting = true
      const oldDate = new Date().getTime() / 1000
      if (!this.setCount) {
        this.setCount = setInterval(() => {
          this.getClock(oldDate)
        }, 250)
      }
    },

    // 计时的主体代码
    getClock(oldDate) {
      let h, m, s
      let newDate = new Date().getTime() / 1000
      this.periodTime = this.lastPeriodTime + newDate - oldDate
      h = Math.floor( this.periodTime / ( 60 * 60 ) )
      m = Math.floor( ( this.periodTime - h * 60 * 60 ) / 60 )
      s = Math.floor( this.periodTime - h * 60 * 60 - m * 60 )
      this.count = this.padZero(h) + ':' + this.padZero(m) + ':' + this.padZero(s)
    },

    // 暂停计时
    stopCount() {
      if (this.stopOrContinue === '暂停') {
        clearInterval(this.setCount)
        this.setCount = null
        this.lastPeriodTime = this.periodTime
        this.stopOrContinue = '继续'
      } else {
        this.startCount()
        this.stopOrContinue = '暂停'
      }
    },

    // 重置计时
    resetCount() {
      clearInterval(this.setCount)
      this.setCount = null
      this.count = '00:00:00'
      this.lastPeriodTime = 0
      this.stopOrContinue = '暂停'
      this.startCount()
    },

    // 展示现在的时间
    showNowTime() {
      this.counting = false
      let date, hour, minute, second
      setInterval(() => {
        date = new Date()
        hour = date.getHours()
        minute = date.getMinutes()
        second = date.getSeconds()
        this.nowTime = this.padZero(hour) + ':' + this.padZero(minute) + ':' + this.padZero(second)
      }, 250)
    },

    // 若只有一位前面补零
    padZero(str) {
      if (!str) {
        return '00'
      }
      if (str && str < 10) {
        return '0' + str
      }
      return str
    }
  }
}
</script>

<style scoped>
.root {
  width: 640px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.nowTime {
  width: 560px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
  background-color: #ffbdc8;
  border: 18px solid #aaaaaa;
  border-radius: 20px;
  box-shadow: 4px 4px 16px #c0c0c0, -4px -2px 16px #c0c0c0;
  margin: 10px auto;
}

.button {
  width: 60%;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  display: flex;
  margin: 0 auto;
}

.clock {
  flex: 1;
  text-align: right;
  border-radius: 10px;
}

.clock:hover, .counter:hover,
.stop:hover, .reset:hover {
  cursor: pointer;
}

.counter {
  flex: 1;
  text-align: left; 
  border-radius: 10px;
  margin-left: 20px;
  padding-left: 10px;
}

.button span {
  display: inline-block;
  width: 80px;
  background-color: #c0c0c0;
  border-radius: 10px;
  padding: 0 20px;
  text-align: center;
}

.stop, .reset {
  flex: 1;
  border-radius: 10px;
  margin-left: 20px;
  padding-left: 10px;
  text-align: center;
}
</style>