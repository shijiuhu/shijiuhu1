<template>
  <div class="calendar">
    <div class="calendarTitle">
      <div class="nowTime">{{ nowTime }} {{ nowTime2 }}</div>
      <div class="nowDate">{{ nowDate }} {{ lunarNowDate }}</div>
    </div>

    <div class="dateInfo">
      <span v-if="dateType === '日'" class="solarDate" @click="switchToMonth" title="点击切换月份">{{ solarYearMonth }}</span>
      <span v-else-if="dateType === '月'" class="solarDate" @click="switchToYear" title="点击切换年份">{{ solarYear }}</span>
      <span v-else class="solarDate">{{ solarYearDecade }}</span>
      <span class="backToToday" @click="backToToday" :title="backToTodayTitle">今日</span>
      <i class="toggleMonth fa fa-angle-down" @click="nextMonth"></i>
      <i class="toggleMonth fa fa-angle-up" @click="previousMonth"></i>
    </div>

    <div class="weekName">
      <span v-for="item in weekName" :key="item">{{ item }}</span>
    </div>
    <div class="dayNumber" v-show="dayArray.length">
      <div v-for="item in dayArray" :key="item" class="dayItem" 
        :class="{ 'dayItem2': !!item.solarDay, 'isThisDay': item.isThisDay }">
        <div class="solarDay">{{ item.solarDay }}</div>
        <div class="lunarDay">
          <span :class="{ 'isLunarFirstDay': item.isLunarFirstDay }">
            {{ item.lunarDay }}
          </span>
        </div>
      </div>
    </div>

    <div class="monthNumber" v-show="monthArray.length">
      <div v-for="item in monthArray" :key="item" class="monthItem" :class="{'isThisMonth': item.isThisMonth }">
        <span @click="showMonthCalendar(item.month)">{{ item.month }}月</span>
      </div>
    </div>

    <div class="yearNumber" v-show="yearArray.length">
      <div v-for="item in yearArray" :key="item" class="yearItem" :class="{'isThisYear': item.isThisYear }">
        <span @click="showYearCalendar(item.year)">{{ item.year }}</span>
      </div>
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
      
      calendarDate: new Date(),
      weekName: ['日', '一', '二', '三', '四', '五', '六'],
      backToTodayTitle: '',
      dateType: '日',

      dayArray: [],
      monthArray: [],
      yearArray: [],

      solarYearMonth: '',
      solarYear: '',
      solarYearDecade: '',
    }
  },
  created() {
    // 首次加载调用一次获得时间，否则页面将有setInterval中设置时间的延迟再出现，不友好，这里使用两种方法展示
    this.getNowTime()
    this.getNowTime2()

    // 每隔一段时间调用一次，实现页面时钟的效果，这里对应各自方法的调用
    this.updateTime()
    this.updateTime2()

    this.updateDate() // 调用得到公历日期（年月日）
    this.updateLunarDate() // 调用得到农历日期（月日）

    this.showDayCalendar(this.calendarDate)
    this.setBackToTodayTitle()
  },
  watch: {
    // 每到凌晨12点需要更新一次日期
    nowTime(newValue) {
      if (newValue === '00:00:00') {
        this.updateDate()
        this.setBackToTodayTitle()
      }
    }
  },
  methods: {
    switchToMonth() {
      this.dateType = '月'
      this.solarYear = this.calendarDate.getFullYear() + '年'

      this.weekName = []
      this.dayArray = []

      this.monthArray = [ 
        { month: 1, year: this.calendarDate.getFullYear() }, { month: 2, year: this.calendarDate.getFullYear() }, 
        { month: 3, year: this.calendarDate.getFullYear() }, { month: 4, year: this.calendarDate.getFullYear() }, 
        { month: 5, year: this.calendarDate.getFullYear() }, { month: 6, year: this.calendarDate.getFullYear() }, 
        { month: 7, year: this.calendarDate.getFullYear() }, { month: 8, year: this.calendarDate.getFullYear() }, 
        { month: 9, year: this.calendarDate.getFullYear() }, { month: 10, year: this.calendarDate.getFullYear() }, 
        { month: 11, year: this.calendarDate.getFullYear() }, { month: 12, year: this.calendarDate.getFullYear() }
      ]
      for (let i = 0; i < 12; i++) {
        if (new Date().getFullYear() === this.monthArray[i].year && new Date().getMonth() === this.monthArray[i].month - 1) {
          this.monthArray[i].isThisMonth = true
        }
      }
    },

    switchToYear() {
      const prefix = this.solarYear.substring(0, 3)
      const startYear = prefix + '0'
      const endYear = prefix + '9'
      this.solarYearDecade = startYear + '-' + endYear
      this.dateType = '年'
      let solarYearObj = {}
      for (let i = startYear; i <= endYear; i++) {
        solarYearObj.year = i
        if (new Date().getFullYear() === i) {
          solarYearObj.isThisYear = true
        }
        this.yearArray.push(solarYearObj)
        solarYearObj = {}
      }
      this.monthArray = []
    },

    showDayCalendar(date) {
      const year = date.getFullYear()
      const month = this.padZero(date.getMonth() + 1)
      this.solarYearMonth = year + '年' + month + '月'

      // 对当月第一天前的日期都置为空，这里因为solarlunar.solar2lunar方法得到的nWeek星期天数字为7，故要重置为0
      let monthFirstDayWeek = solarlunar.solar2lunar(year, month, this.padZero(1)).nWeek
      monthFirstDayWeek = monthFirstDayWeek === 7 ? 0 : monthFirstDayWeek
      for (let i = -monthFirstDayWeek; i < 0; i++) {
        this.dayArray.push('')
      }

      // 闰年的2月要置为29天
      const monthDayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthDayArray[1] = 29
      }
      const monthDay = monthDayArray[date.getMonth()]

      let showDate = {}
      let solarLunarDay, lunarDay, lunarTerm
      for (let i = 1; i <= monthDay; i++) {
        // 这里设置阳历的日，直接放入i，比方法2取日期再取日的值要简洁一些
        showDate.solarDay = i

        // 这里放入年月是为了后续比较是否是当天
        showDate.year = year
        showDate.month = month

        // 这里设置农历的日，同时记录初一，在页面上特别展示，如果有节气，则用节气取代原有的农历日
        solarLunarDay = solarlunar.solar2lunar(year, month, this.padZero(i))
        lunarDay = solarLunarDay.dayCn
        showDate.isLunarFirstDay = lunarDay === '初一' ? true : false
        lunarTerm = solarLunarDay.term
        showDate.lunarDay = !lunarTerm ? lunarDay: lunarTerm

        // 判断是否当天，在页面上特别展示
        if (this.getThisYMD() === year + '-' + month + '-' + this.padZero(i)) {
          showDate.isThisDay = true
        }
        this.dayArray.push(showDate)
        showDate = {}
      }
      this.dateType = '日'
      // 使用下面这种做法就不需要在上面for循环中使用if，从而只需要判断一次，
      // 但代码不够简洁，而for循环的量也不大，性能提高不明显，故不用，仅做参考
      // const todayIndex = new Date().getDate() + monthFirstDayWeek - 1
      // if (todayIndex <= this.dayArray.length - 1) {
      //   const today = this.dayArray[todayIndex]
      //   if (today.year === year && today.month === month) {
      //     today.isThisDay = true
      //   }
      // }
      // console.log(this.dayArray)
    },

    showMonthCalendar(value) {
      const year = this.calendarDate.getFullYear()
      this.calendarDate = new Date(year, value - 1, 1)
      this.showDayCalendar(this.calendarDate)
      this.weekName = ['日', '一', '二', '三', '四', '五', '六']
      this.monthArray = []
      this.yearArray = []
    },

    showYearCalendar(value) {
      this.yearArray = []
      this.solarYear = value + '年'
      this.calendarDate = new Date(value, 0, 1)
      this.monthArray = [ 
        { month: 1, year: value }, { month: 2, year: value }, 
        { month: 3, year: value }, { month: 4, year: value }, 
        { month: 5, year: value }, { month: 6, year: value }, 
        { month: 7, year: value }, { month: 8, year: value }, 
        { month: 9, year: value }, { month: 10, year: value }, 
        { month: 11, year: value }, { month: 12, year: value }
      ]
      for (let i = 0; i < 12; i++) {
        if (new Date().getFullYear() === this.monthArray[i].year && new Date().getMonth() === this.monthArray[i].month - 1) {
          this.monthArray[i].isThisYear = true
        }
      }
      this.dateType = '月'
    },

    // 切换到上一个月，这里写成逗号分隔的形式可以直接month-1，原来不知道可以这样写
    previousMonth() {
      switch(this.dateType) {
        case '日': {
          let year = this.calendarDate.getFullYear()
          let month = this.calendarDate.getMonth() + 1
          if (month == 1) {
            year = year - 1
            month = 12
          } else {
            month = month - 1
          }
          this.calendarDate = new Date(year + '-' + this.padZero(month) + '-01')
          this.dayArray = []
          this.showDayCalendar(this.calendarDate)
          this.weekName = ['日', '一', '二', '三', '四', '五', '六']
          this.monthArray = []
        }
        break;

        case '月': {
          const year = this.calendarDate.getFullYear()
          const month = this.calendarDate.getMonth()
          const day = this.calendarDate.getDate()
          this.calendarDate = new Date(year - 1, month, day)
          this.solarYear = this.calendarDate.getFullYear() + '年'
          this.monthArray = [
            { month: 1, year: this.calendarDate.getFullYear() }, { month: 2, year: this.calendarDate.getFullYear() }, 
            { month: 3, year: this.calendarDate.getFullYear() }, { month: 4, year: this.calendarDate.getFullYear() }, 
            { month: 5, year: this.calendarDate.getFullYear() }, { month: 6, year: this.calendarDate.getFullYear() }, 
            { month: 7, year: this.calendarDate.getFullYear() }, { month: 8, year: this.calendarDate.getFullYear() }, 
            { month: 9, year: this.calendarDate.getFullYear() }, { month: 10, year: this.calendarDate.getFullYear() }, 
            { month: 11, year: this.calendarDate.getFullYear() }, { month: 12, year: this.calendarDate.getFullYear() }
          ]
          for (let i = 0; i < 12; i++) {
            if (new Date().getFullYear() === this.monthArray[i].year && new Date().getMonth() === this.monthArray[i].month - 1) {
              this.monthArray[i].isThisMonth = true
            }
          }
        }
        break;

        case '年': {
          console.log('111111111')
          const prefix = this.solarYear.substring(0, 3)
          const startYear = prefix - 1 + '0'
          const endYear = prefix - 1 + '9'
          this.calendarDate = new Date(this.solarYear)
          this.solarYear = startYear
          this.solarYearDecade = startYear + '-' + endYear
          this.yearArray = []

          let solarYearObj = {}
          for (let i = startYear; i <= endYear; i++) {
            solarYearObj.year = i
            if (new Date().getFullYear() === i) {
              solarYearObj.isThisYear = true
            }
            this.yearArray.push(solarYearObj)
            solarYearObj = {}
          }
        }
        break;
      }
    },

    // 切换到下一个月，这里写成逗号分隔的形式可以直接month+1，原来不知道可以这样写
    nextMonth() {
      switch(this.dateType) {
        case '日': {
          let year = this.calendarDate.getFullYear()
          let month = this.calendarDate.getMonth() + 1
          if (month == 12) {
            year = year + 1
            month = 1
          } else {
            month = month + 1
          }
          this.calendarDate = new Date(year + '-' + this.padZero(month) + '-01')
          this.dayArray = []
          this.showDayCalendar(this.calendarDate)
          this.weekName = ['日', '一', '二', '三', '四', '五', '六']
          this.monthArray = []
        }
        break;

        case '月': {
          const year = this.calendarDate.getFullYear()
          const month = this.calendarDate.getMonth()
          const day = this.calendarDate.getDate()
          this.calendarDate = new Date(year + 1, month, day)
          this.solarYear = this.calendarDate.getFullYear() + '年'
          this.monthArray = [
            { month: 1, year: this.calendarDate.getFullYear() }, { month: 2, year: this.calendarDate.getFullYear() }, 
            { month: 3, year: this.calendarDate.getFullYear() }, { month: 4, year: this.calendarDate.getFullYear() }, 
            { month: 5, year: this.calendarDate.getFullYear() }, { month: 6, year: this.calendarDate.getFullYear() }, 
            { month: 7, year: this.calendarDate.getFullYear() }, { month: 8, year: this.calendarDate.getFullYear() }, 
            { month: 9, year: this.calendarDate.getFullYear() }, { month: 10, year: this.calendarDate.getFullYear() }, 
            { month: 11, year: this.calendarDate.getFullYear() }, { month: 12, year: this.calendarDate.getFullYear() }
          ]
          for (let i = 0; i < 12; i++) {
            if (new Date().getFullYear() === this.monthArray[i].year && new Date().getMonth() === this.monthArray[i].month - 1) {
              this.monthArray[i].isThisMonth = true
            }
          }
        }
        break;

        case '年': {
          const prefix = this.solarYear.substring(0, 3)
          const startYear = parseInt(prefix) + 1 + '0'
          const endYear = parseInt(prefix) + 1 + '9'
          this.calendarDate = new Date(this.solarYear)
          this.solarYear = startYear
          this.solarYearDecade = startYear + '-' + endYear
          this.yearArray = []

          let solarYearObj = {}
          for (let i = startYear; i <= endYear; i++) {
            solarYearObj.year = i
            if (new Date().getFullYear() === i) {
              solarYearObj.isThisYear = true
            }
            this.yearArray.push(solarYearObj)
            solarYearObj = {}
          }
        }
        break;
      }
    },

    // 设置回到今日的悬浮提示文字，仅在初始化和凌晨12点时调用
    setBackToTodayTitle() {
      this.backToTodayTitle = '点击返回今日' + this.nowDate
    },

    // 点击回到今日按钮，重置时间为当天，因为当天没有其他特别展示，所以其实就是当月
    backToToday() {
      this.calendarDate = new Date()
      this.dayArray = []
      this.showDayCalendar(this.calendarDate)
      this.weekName = ['日', '一', '二', '三', '四', '五', '六']
      this.monthArray = []
    },

    // 展示日历方法2，和方法1比有些不一样，但我仍然保留，可以参考，后续有些设置当天和初一这里没做了，都一样
    showDayCalendar2(date) {
      const year = date.getFullYear()
      const month = this.padZero(date.getMonth() + 1)
      this.solarYearMonth = year + '年' + month + '月'

      // 对当月第一天前的日期都置为空
      const monthFirstDayWeek = new Date(year + '-' + month + '-01').getDay()
      for (let i = -monthFirstDayWeek; i < 0; i++) {
        this.dayArray.push('')
      }

      // 闰年的2月要置为29天
      const monthDayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthDayArray[1] = 29
      }
      const monthDay = monthDayArray[date.getMonth()]

      let showDate = {}
      let formatStr, lunarDay, lunarMonthDay, lunarTerm
      for (let i = 1; i <= monthDay; i++) {
        // 这里设置阳历的日
        formatStr = year + '-' + month + '-' + this.padZero(i)
        showDate.solarDay = new Date(formatStr).getDate()

        // 这里设置农历的日
        lunarMonthDay = lunarDate.getLunar(formatStr)
        lunarDay = lunarMonthDay.substring(lunarMonthDay.indexOf('月')+1)
        lunarTerm = solarlunar.solar2lunar(year, month, this.padZero(i)).term
        showDate.lunarDay = !lunarTerm ? lunarDay : lunarTerm

        this.dayArray.push(showDate)
        showDate = {}
      }
      console.log(this.dayArray)
    },

    // 返回一个yyyy-MM-dd日期格式的字符串
    getThisYMD() {
      const date = new Date()
      const thisYear = date.getFullYear()
      const thisMonth = this.padZero(date.getMonth() + 1)
      const thisDay = this.padZero(date.getDate())
      const thisYMD = thisYear + '-' + thisMonth + '-' + thisDay
      return thisYMD
    },

    // 对只有一位数字的情况前面补0
    padZero(str) {
      return str < 10 ? '0' + str : str
    },

    // 定时1秒更新时间（时分秒）
    updateTime() {
      setInterval(() => {
        this.getNowTime()
      }, 250)
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
      }, 250)
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
  height: 36px;
  line-height: 36x;
  border: 1px solid black;
  border-bottom: none;
}

.solarDate {
  display: inline-block;
  padding-left: 20px;
  line-height: 36px;
  width: 120px;
}

.solarDate:hover {
  cursor: pointer;
}

.backToToday {
  display: inline-block;
  margin-left: 50px;
  height: 28px;
  width: 28px;
  line-height: 28px;
  border: 1px solid gray;
  border-radius: 50%;
  box-shadow:0 0 3px 0 red;
  color: blue;
  font-size: 8px;
}

.backToToday:hover {
  cursor: pointer;
}

.nowDate {
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
}

.toggleMonth {
  float: right;
  line-height: 30px;
  font-size: 28px;
}

.toggleMonth:hover {
  cursor: pointer;
  color: blue;
}

.fa {
  padding: 0 20px 0 20px;
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

.dayNumber {
  border: 1px solid black;
  border-top: none;
  width: 408px;
  font-size: 16px;
}

.dayItem {
  display: inline-block;
  text-align: center;
  width: 56.29px;
  padding: 10px 0;
  border: 1px double transparent;
}

.dayItem2:hover {
  cursor: pointer;
  background-color: lightblue;
  border: 1px double black;
}

.calendar {
  width: 408px;
  background-color: whitesmoke;
  margin: 0 auto;
}

.isThisDay, .isThisMonth, .isThisYear {
  color: #f00;
  background-color: lightgreen;
}

.isLunarFirstDay {
  border-bottom: 1px solid blue;
}

.lunarDay {
  font-size: 14px;
}

.monthNumber, .yearNumber {
  width: 408px;
  border: 1px solid black;
}

.monthItem, .yearItem {
  display: inline-block;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid transparent;
}

.monthItem:hover, .yearItem:hover {
  cursor: pointer;
  background-color: lightblue;
  border: 1px double black;
}
</style>