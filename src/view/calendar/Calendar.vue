<template>
  <div class="calendar">
    <div class="calendarTitle">
      <div class="nowTime">{{ nowTime }} {{ nowTime2 }}</div>
      <div class="nowDate">{{ nowDate }} {{ lunarNowDate }}</div>
    </div>

    <div class="dateInfo">
      <span v-if="dateType === '日'" class="solarDate" @click="showMonthCalendar(0, '')" title="点击切换月份">{{ solarYearMonth }}</span>
      <span v-else-if="dateType === '月'" class="solarDate" @click="showYearCalendar(0)" title="点击切换年份">{{ solarYear }}</span>
      <span v-else class="solarDate">{{ solarYearDecade }}</span>
      <span class="backToToday" @click="showDayCalendar(0, '')" :title="backToTodayTitle">今日</span>
      <i class="toggleMonth fa fa-angle-down" @click="previousOrNextDate(1)"></i>
      <i class="toggleMonth fa fa-angle-up" @click="previousOrNextDate(-1)"></i>
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
      <div v-for="item in monthArray" :key="item" class="monthItem" :class="{'isThisMonth': item.isThisMonth }"
        @click="showDayCalendar(0, item.month)">
        <span>{{ item.month }}月</span>
      </div>
    </div>

    <div class="yearNumber" v-show="yearArray.length">
      <div v-for="item in yearArray" :key="item" class="yearItem" :class="{'isThisYear': item.isThisYear }"
        @click="showMonthCalendar(0, item.year)">
        <span>{{ item.year }}</span>
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
      previousOrNext: 0,

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

    this.showDayCalendar(0, '') // 刚打开页面时要展示当天的数据
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
  computed: {
    calendarYear() {
      return this.calendarDate.getFullYear()
    },
    calendarMonth() {
      return this.calendarDate.getMonth()
    }
  },
  methods: {
    showDayCalendar(previousOrNext, month) {
      // 1.month有值，说明指定了具体的日期，所以一定是点击月份跳转
      // 2.previousOrNext不为0，说明是切换上下月
      // 3.previousOrNext为0，说明是初始化、回今日
      if (month) {
        this.calendarDate = new Date(this.calendarYear, month - 1, 1)
      } else if (previousOrNext) {
        this.calendarDate = new Date(this.calendarYear, this.calendarMonth + previousOrNext, 1)
      } else {
        this.calendarDate = new Date()
      }
      this.solarYearMonth = this.calendarYear + '年' + this.padZero(this.calendarMonth + 1) + '月'
      this.dateType = '日'
      this.dayArray = []
      let showDate = {}
      let solarLunarDay, lunarDay, term, monthCn, dayCn
      for (let i = 1; i <= this.getMonthDay(); i++) {
        showDate.solarDay = i

        solarLunarDay = solarlunar.solar2lunar(this.calendarYear, this.calendarMonth + 1, i)
        // 对当月第一天前的日期都置为空，这里因为solarlunar.solar2lunar方法得到的nWeek星期天数字为7，故要重置为0
        if (i === 1) {
          const monthFirstDayWeek = solarLunarDay.nWeek === 7 ? 0 : solarLunarDay.nWeek
          for (let i = -monthFirstDayWeek; i < 0; i++) {
            this.dayArray.push('')
          }          
        }
        
        // 这里设置农历的日，在页面上特别展示，优先级如：清明 > 二月 > 初一
        term = solarLunarDay.term
        monthCn = solarLunarDay.monthCn
        dayCn = solarLunarDay.dayCn

        showDate.isLunarFirstDay = dayCn === '初一'
        showDate.lunarDay = term ? term : ( showDate.isLunarFirstDay ? monthCn : dayCn )
        showDate.isThisDay = this.isThisDay(i)

        this.dayArray.push(showDate)
        showDate = {}
      }
      this.weekName = ['日', '一', '二', '三', '四', '五', '六']
      this.monthArray = []
      this.yearArray = []
      // 使用下面这种做法就不需要在上面for循环中使用isThisDay判断，从而只需要判断一次，
      // 但这段代码还要单独拿出来处理，完整性受到破坏，而for循环的量也不大，性能提高不明显，故不用，仅做参考
      // const todayIndex = new Date().getDate() + monthFirstDayWeek - 1
      // if (todayIndex <= this.dayArray.length - 1) {
      //   const today = this.dayArray[todayIndex]
      //   if (today.year === year && today.month === month) {
      //     today.isThisDay = true
      //   }
      // }
      // console.log(this.dayArray)
    },

    showMonthCalendar(previousOrNext, value) {
      // 1.value有值，说明指定了具体的日期，所以一定是点击年份跳转
      // 2.previousOrNext不为0，说明是切换上下月
      // 3.previousOrNext为0，说明是由天日期切换成月日期
      if (value) {
        this.calendarDate = new Date(value , this.calendarMonth, 1)
      } else if (previousOrNext) {
        this.calendarDate = new Date(this.calendarYear + previousOrNext, this.calendarMonth, 1)
        value = this.calendarYear
      } else {
        value = this.calendarYear
      }
      this.dateType = '月'
      this.weekName = []
      this.dayArray = []
      this.yearArray = []
      this.solarYear = value + '年'
      this.monthArray = [
        { month: 1, year: value }, { month: 2, year: value }, 
        { month: 3, year: value }, { month: 4, year: value }, 
        { month: 5, year: value }, { month: 6, year: value }, 
        { month: 7, year: value }, { month: 8, year: value }, 
        { month: 9, year: value }, { month: 10, year: value }, 
        { month: 11, year: value }, { month: 12, year: value }
      ]
      for (let i = 0; i < 12; i++) {
        this.monthArray[i].year = value
        if (new Date().getFullYear() === this.monthArray[i].year && new Date().getMonth() === this.monthArray[i].month - 1) {
          this.monthArray[i].isThisMonth = true
        }
      }
    },

    showYearCalendar(previousOrNext) {
      const prefixNumber = parseInt(this.solarYear.substring(0, 3))
      const startYear = prefixNumber + previousOrNext + '0'
      const endYear = prefixNumber + previousOrNext + '9'

      this.solarYear = startYear
      this.solarYearDecade = startYear + '-' + endYear
      this.dateType = '年'
      this.yearArray = []

      let showYearDate = {}
      for (let i = startYear; i <= endYear; i++) {
        showYearDate.year = i
        if (new Date().getFullYear() === i) {
          showYearDate.isThisYear = true
        }
        this.yearArray.push(showYearDate)
        showYearDate = {}
      }
      this.monthArray = []
    },

    // 向上向下切换年月
    previousOrNextDate(number) {
      switch(this.dateType) {
        case '日':
          this.showDayCalendar(number, '')
          break;
        case '月':
          this.showMonthCalendar(number, '')
          break;
        case '年': 
          this.showYearCalendar(number)
          break;
      }
    },

    // 设置回到今日的悬浮提示文字，仅在初始化和凌晨12点时调用
    setBackToTodayTitle() {
      this.backToTodayTitle = '点击返回今日' + this.nowDate
    },

    // 得到月份的天数
    getMonthDay() {
      // 闰年的2月要置为29天
      const monthDayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (this.calendarYear % 400 === 0 || (this.calendarYear % 100 !== 0 && this.calendarYear % 4 === 0)) {
        monthDayArray[1] = 29
      }
      return monthDayArray[this.calendarMonth]
    },

    // 判断是否当天，在页面上特别展示
    isThisDay(number) {
      const date = new Date()
      const thisYear = date.getFullYear() === this.calendarYear
      const thisMonth = date.getMonth() === this.calendarMonth
      const thisDay = date.getDate() === number
      return thisYear && thisMonth && thisDay
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