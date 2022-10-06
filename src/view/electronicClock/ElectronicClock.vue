<template>
  <div class="root">
    <div class="nowTime">
      <span v-if="!countState">{{ nowTime }}</span>
      <span v-else>{{ count }}</span>
    </div>
    <div class="button">
      <div class="clock" @click="showNowTime"><span>时钟</span></div>
      <div class="counter" @click="readyCount" v-if="!countState"><span>计时器</span></div>
      <div class="stop" @click="toggleCount" v-if="countState"><span>{{ toggleState }}</span></div>
      <div class="reset" @click="resetCount" v-if="countState"><span>重置</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElectronicClock',
  data() {
    return {
      nowTime: '',
      count: '00:00:00.0',
      countState: false,
      setCount: null,
      toggleState: '开始',
      periodTime: 0,
      lastPeriodTime: 0
    }
  },
  created() {
    // 打开页面让其展示现在的时间
    this.showNowTime()
  },
  methods: {
    // 进入计时状态，切换显示按钮
    readyCount() {
      this.countState = true
    },

    // 计时的主体代码
    getClock(oldDate) {
      let h, m, s, ms
      let newDate = new Date().getTime() / 1000
      this.periodTime = this.lastPeriodTime + newDate - oldDate
      h = Math.floor( this.periodTime / ( 60 * 60 ) )
      m = Math.floor( ( this.periodTime - h * 60 * 60 ) / 60 )
      s = Math.floor( this.periodTime - h * 60 * 60 - m * 60 )
      ms = Math.floor(((this.periodTime - h * 60 * 60 - m * 60 - s) * 10).toFixed(1))
      this.count = this.padZero(h) + ':' + this.padZero(m) + ':' + this.padZero(s) + '.' + ms
    },

    // 开始计时、继续计时、暂停计时
    toggleCount() {
      if (this.toggleState === '开始' || this.toggleState === '继续') {
        this.toggleState = '暂停'
        const oldDate = new Date().getTime() / 1000
        if (!this.setCount) {
          this.setCount = setInterval(() => {
            this.getClock(oldDate)
          }, 100)
        }
      } else if (this.toggleState === '暂停') {
        clearInterval(this.setCount)
        this.setCount = null
        this.lastPeriodTime = this.periodTime
        this.toggleState = '继续'
      }
    },

    // 重置计时
    resetCount() {
      clearInterval(this.setCount)
      this.setCount = null
      this.count = '00:00:00.0'
      this.lastPeriodTime = 0
      this.toggleState = '开始'
    },

    // 展示现在的时间
    showNowTime() {
      this.countState = false
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