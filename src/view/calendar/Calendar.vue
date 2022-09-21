<template>
  <div class="calendarTitle">
    <div class="nowTime">{{ nowTime }} {{ nowTime2 }}</div>
    <div class="nowDate">{{ nowDate }} {{ lunarNowDate }}</div>
  </div>

  <div class="dateInfo">
    <span class="solarYearMonth">{{ solarYearMonth }}</span>
    <i class="toggleMonth fa fa-angle-down" @click="nextMonth"></i>
    <i class="toggleMonth fa fa-angle-up" @click="previousMonth"></i>
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
    <div v-for="item in array" :key="item" class="weekDay">
      <div class="solarDay">{{ item.solarDay }}</div>
      <div class="lunarDay">{{ item.lunarDay }}</div>
    </div>
  </div>
</template>

<script>
import lunarDate from './lunarDate.js'
import solarlunar from 'solarlunar'

export default {
  name: 'Calendar',
  data() {
    return {
      nowTime: '',
      nowTime2: '',
      nowDate: '',
      lunarNowDate: '',
      array: [],
      calendarDate: new Date(),
      solarYearMonth: ''
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

    this.showCalendar(new Date())
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
    // 切换到上一个月
    previousMonth() {
      let year = this.calendarDate.getFullYear()
      let month = this.calendarDate.getMonth() + 1
      if (month == 1) {
        year = year - 1
        month = 12
      } else {
        month = month - 1
      }
      this.calendarDate = new Date(year + '-' + this.padZero(month) + '-01')
      this.array = []
      this.showCalendar(this.calendarDate)
    },

    // 切换到下一个月
    nextMonth() {
      let year = this.calendarDate.getFullYear()
      let month = this.calendarDate.getMonth() + 1
      if (month == 12) {
        year = year + 1
        month = 1
      } else {
        month = month + 1
      }
      this.calendarDate = new Date(year + '-' + this.padZero(month) + '-01')
      this.array = []
      this.showCalendar(this.calendarDate)
    },

    // 展示日历
    showCalendar(date) {
      this.solarYearMonth = date.getFullYear() + '年' + this.padZero(date.getMonth() + 1) + '月'

      const monthFirstDayWeek = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-01').getDay()
      for (let i = -monthFirstDayWeek; i < 0; i++) {
        this.array.push('')
      }
      const monthDayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (date.getFullYear() % 400 === 0 || (date.getFullYear() % 100 !== 0 && date.getFullYear() % 4 === 0)) {
        monthDayArray[1] = 29
      }
      const monthDay = monthDayArray[date.getMonth()]
      let obj = {}
      let formatStr
      let lunarDay
      let lunarMonthDay
      let term
      for (let i = 1; i <= monthDay; i++) {
        formatStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + this.padZero(i)
        obj.solarDay = new Date(formatStr).getDate()

        lunarMonthDay = lunarDate.getLunar(formatStr)
        lunarDay = lunarMonthDay.substring(lunarMonthDay.indexOf('月')+1)
        term = solarlunar.solar2lunar(date.getFullYear(), date.getMonth() + 1, this.padZero(i)).term
        obj.lunarDay = !term ? lunarDay : term

        this.array.push(obj)
        obj = {}
      }
      console.log(this.array)
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
@import "font-awesome/css/font-awesome.min.css";

.calendarTitle {
  width: 408px;
  border: 1px solid black;
  padding-bottom: 10px;
}

.nowTime {
  font-size: 40px;
  font-weight: 700;
  padding-left: 20px;
}

.dateInfo {
  width: 408px;
  height: 30px;
  line-height: 30px;
  border: 1px solid black;
  border-bottom: none;
}

.solarYearMonth {
  padding-left: 20px;
}

.nowDate {
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
}

.toggleMonth {
  float: right;
  line-height: 30px;
}

.toggleMonth:hover {
  cursor: pointer;
  color: blue;
}

.fa-angle-down {
  padding: 0 12px 0 18px;
}

.weekName {
  display: flex;
  width: 408px;
  height: 40px;
  line-height: 40px;
  border: 1px solid black;
  border-top: none;
  border-bottom: none;
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
  border-top: none;
  width: 408px;
  font-size: 16px;
}

.weekDay {
  display: inline-block;
  text-align: center;
  width: 58px;
  padding: 10px 0;
}

.lunarDay {
  font-size: 14px;
}
</style>