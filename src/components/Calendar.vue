<template>
  <div class="calendarTitle">
    <div class="nowTime">{{ nowTime }} {{ nowTime2 }}</div>
    <div class="nowDate">{{ nowDate }} {{ lunarNowDate }}</div>
    <div>获取月日历数据 {{ monthFirstDay }}</div>
  </div>
  <div class="weekName">
    <span>日</span>
    <span>一</span>
    <span>二</span>
    <span>三</span>
    <span>四</span>
    <span>五</span>
    <span>六</span>
  </div>
  <div class="weekNumber">
    <span v-for="(item, index) in map" :key="item">{{ index + 1 }}</span>
  </div>
</template>

<script>
import lunarDate from '../common/lunarDate.js'

export default {
  name: 'Calendar',
  data() {
    return {
      nowTime: '',
      nowTime2: '',
      nowDate: '',
      lunarNowDate: '',
      monthFirstDay: '01',
      map: new Map()
    }
  },
  created() {
    // 首次加载调用一次获得时间，否则页面将有setInterval中1000ms的延迟再出现，不友好，这里使用两种方法展示
    this.getNowTime()
    this.getNowTime2()

    // 每隔1000ms调用一次，实现页面时钟的效果，这里对应各自方法的调用
    this.updateTime()
    this.updateTime2()

    this.updateDate() // 调用得到公历日期（年月日）
    this.updateLunarDate() // 调用得到农历日期（月日）

    this.getMonthFirstDay()
  },
  watch: {
    // 每到凌晨12点需要更新一次日期
    nowTime(newValue) {
      if (newValue === '00:00:00') {
        this.updateDate()
      }
    }
  },
  methods: {
    getMonthFirstDay() {
      const date = new Date()
      const monthDayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      const monthDay = monthDayArray[date.getMonth()]
      for (let i = 1; i <= monthDay; i++) {
        this.map.set(i, new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + this.padZero(i)))
      }
    },

    // 对只有一位数字的情况前面补0
    padZero(str) {
      return str < 10 ? '0' + str : str
    },

    // 定时1秒更新时间（时分秒）
    updateTime() {
      setInterval(() => {
        this.getNowTime()
      }, 1000)
    },

    // 得到时间（时分秒）
    getNowTime() {
      const date = new Date()
      this.nowTime = this.padZero(date.getHours()) + ':' + this.padZero(date.getMinutes()) + ':' + this.padZero(date.getSeconds())
    },

    // 方法2中定时1秒更新时间（时分秒）
    updateTime2() {
      setInterval(() => {
        this.getNowTime2()
      }, 1000)
    },

    // 方法2得到时间（时分秒）（转成字符串取第5个）
    getNowTime2() {
      const date = new Date()
      this.nowTime2 = date.toString().split(' ')[4]
    },
    
    // 得到公历年月日
    updateDate() {
      const date = new Date()
      this.nowDate = date.getFullYear() + '年' + this.padZero(date.getMonth()+1) + '月' + this.padZero(date.getDate()) + '日'
    },
    
    // 得到农历日期（月日）
    updateLunarDate() {
      this.lunarNowDate = lunarDate.getLunar()
    }
  }
}
</script>

<style scoped>
.calendarTitle {
  width: 408px;
  border: 1px solid black;
}

.nowTime {
  font-size: 40px;
  font-weight: 700;
}

.nowDate {
  font-size: 20px;
  font-weight: 700;
}

.weekName {
  display: flex;
  width: 408px;
  height: 40px;
  line-height: 40px;
  border: 1px solid black;
  font-size: 18px;
  font-weight: 700;
}

.weekName span {
  flex: 1;
  border: none;
  text-align: center;
}

.weekNumber {
  border: 1px solid black;
  width: 408px;
  font-size: 16px;
}

.weekNumber span {
  display: inline-block;
  text-align: center;
  width: 58px;
  padding: 6px 0;
}
</style>