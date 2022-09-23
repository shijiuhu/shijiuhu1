<template>
  <div class="calendar">
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
      <span v-for="item in weekName" :key="item">{{ item }}</span>
    </div>

    <div class="weekNumber">
      <div v-for="item in showDateArray" :key="item" class="weekDay" 
        :class="{ 'weekDay2': !!item.solarDay, 'isToday': item.isToday }">
        <div class="solarDay">{{ item.solarDay }}</div>
        <div class="lunarDay">
          <span :class="{ 'isLunarFirstDay': item.isLunarFirstDay }">
            {{ item.lunarDay }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <table>
    <tr>
      <td>
        <div class="name">solarMonth</div>
        <div class="description">公历每个月份的天数普通表</div>
      </td>
      <td>{{ solarlunarDate.solarMonth }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">gan</div>
        <div class="description">天干地支之天干速查表</div>
      </td>
      <td>{{ solarlunarDate.gan }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">zhi</div>
        <div class="description">天干地支之地支速查表</div>
      </td>
      <td>{{ solarlunarDate.zhi }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">animals</div>
        <div class="description">生肖表</div>
      </td>
      <td>{{ solarlunarDate.animals }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">lunarTerm</div>
        <div class="description">24节气速查表</div>
      </td>
      <td>{{ solarlunarDate.lunarTerm }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">nStr1</div>
        <div class="description">数字转中文速查表</div>
      </td>
      <td>{{ solarlunarDate.nStr1 }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">nStr2</div>
        <div class="description">日期转农历称呼速查表</div>
      </td>
      <td>{{ solarlunarDate.nStr2 }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">nStr3</div>
        <div class="description">月份转农历称呼速查表</div>
      </td>
      <td>{{ solarlunarDate.nStr3 }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">lunarInfo</div>
        <div class="description">农历1900-2100的润大小信息表</div>
      </td>
      <td>{{ solarlunarDate.lunarInfo }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">lTermInfo</div>
        <div class="description">1900-2100各年的24节气日期速查表</div>
      </td>
      <td>{{ solarlunarDate.lTermInfo }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">solarlunar20221008</div>
        <div class="description">一个具体的日期数据</div>
      </td>
      <td>{{ solarlunar20221008 }}</td>
    </tr>
    <tr>
      <td>
        <div class="name">返回值</div>
      </td>
      <td>
            (Number) lYear : 农历年
        <br>(Number) lMonth : 农历月
        <br>(Number) lDay : 农历日
        <br>(String) monthCn : 农历月中文名称，如果为闰月，则会在月份前增加 闰 字
        <br>(String) dayCn : 农历日中文名称
        <br>(String) animal : 生肖
        <br>(String) gzYear : 年的农历叫法（干支）
        <br>(String) gzMonth : 月的农历叫法（干支）
        <br>(String) gzDay : 日的农历叫法(干支) 
        <br>(Number) cYear : 公历年
        <br>(Number) cMonth : 公历月
        <br>(Number) cDay : 公历日
        <br>(Number) nWeek : 周几
        <br>(String) ncWeek : 中文周几
        <br>(Boolean) isLeap : 是否是闰月
        <br>(Boolean) isToday : 是否是今天
        <br>(Boolean) isTerm : 是否有节气
        <br>(String) term : 节气，如果没有则返回空字符串
      </td>
    </tr>
    <tr>
      <td>
        <div class="name">示例</div>
      </td>
      <td>
            {
        <br>&nbsp;&nbsp;lYear: 2015,
        <br>&nbsp;&nbsp;lMonth: 8,
        <br>&nbsp;&nbsp;lDay: 26,
        <br>&nbsp;&nbsp;animal: '羊',
        <br>&nbsp;&nbsp;monthCn: '八月',
        <br>&nbsp;&nbsp;dayCn: '廿六',
        <br>&nbsp;&nbsp;cYear: 2015,
        <br>&nbsp;&nbsp;cMonth: 10,
        <br>&nbsp;&nbsp;cDay: 8,
        <br>&nbsp;&nbsp;gzYear: '乙未',
        <br>&nbsp;&nbsp;gzMonth: '丙戌',
        <br>&nbsp;&nbsp;gzDay: '丁巳',
        <br>&nbsp;&nbsp;isToday: false,
        <br>&nbsp;&nbsp;isLeap: false,
        <br>&nbsp;&nbsp;nWeek: 4,
        <br>&nbsp;&nbsp;ncWeek: '星期四',
        <br>&nbsp;&nbsp;isTerm: true,
        <br>&nbsp;&nbsp;term: '寒露'
        <br>}
      </td>
    </tr>
    <tr>
      <td>
        <div class="name">方法</div>
      </td>
      <td>
            (Object) solarLunar.solar2lunar : 输入的日子为公历年月日
        <br>参数 : (Number)年,(Number)月,(Number)日
        <br>solarLunar.solar2lunar(2015, 10, 8);
        <br>solarLunar.solar2lunar(2015, 10, 08); // 等价于上者
        <br>
        <br>(Object) solarLunar.lunar2solar : 输入的日子为农历年月日
        <br>参数 : (Number)年,(Number)月,(Number)日
        <br>solarLunar.lunar2solar(2015, 8, 26);
        <br>solarLunar.lunar2solar(2015, 08, 26); // 等价于上者
        <br>
        <br>(Number) lYearDays : 返回农历 y 年一整年的总天数
        <br>const count = solarLunar.lYearDays(1987); //count=387
        <br>
        <br>(Number (0-12)) leapMonth : 返回农历 y 年闰月是哪个月；若 y 年没有闰月 则返回 0
        <br>const leapMonth = solarLunar.leapMonth(1987); //leapMonth=6
        <br>
        <br>(Number (0|29|30)) leapDays : 返回农历 y 年闰月的天数 若该年没有闰月则返回 0
        <br>const leapMonthDay = solarLunar.leapDays(1987); //leapMonthDay=29
        <br>
        <br>(Number (-1|29|30)) monthDays : 返回农历 y 年 m 月（非闰月）的总天数，计算 m 为闰月时的天数请使用 leapDays 方法
        <br>const MonthDay = solarLunar.monthDays(1987, 9); //MonthDay=29
        <br>
        <br>(Number (-1、28、29、30、31)) solarDays : 返回公历(!)y 年 m 月的天数
        <br>const solarMonthDay = solarLunar.leapDays(1987); //solarMonthDay=30
        <br>
        <br>(Number) toGanZhi : 传入 offset 偏移量返回干支
        <br>
        <br>(Number) toGanZhi : 传入公历(!)y 年获得该年第 n 个节气的公历日期
        <br>第一个参数为公历年(1900-2100)；
        <br>第二个参数为二十四节气中的第几个节气(1~24)；从 n=1(小寒)算起
        <br>const _24 = solarLunar.getTerm(1987, 3); //_24=4;意即1987年2月4日立春
        <br>
        <br>(String) toChinaMonth : 传入农历数字月份返回汉语通俗表示法
        <br>const cnMonth = solarLunar.toChinaMonth(12); //cnMonth='腊月'
        <br>
        <br>(String) toChinaDay : 传入农历日期数字返回汉字表示法
        <br>const cnDay = solarLunar.toChinaDay(21); //cnMonth='廿一'
        <br>
        <br>(String) getAnimal : 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
        <br>const animal = solarLunar.getAnimal(1987); //animal='兔'
      </td>
    </tr>
    <tr>
      <td>
        <div class="name">相关链接</div>
      </td>
      <td>
        <a href="https://www.npmjs.com/package/solarlunar" target="_blank">
          https://www.npmjs.com/package/solarlunar
        </a>
        <br>
        <a href="https://blog.jjonline.cn/userInterFace/173.html" target="_blank">
          https://blog.jjonline.cn/userInterFace/173.html
        </a>
      </td>
    </tr>
    <tr>
      <td class="last">
        <div class="name">solarlunarDate</div>
        <div class="description">solarlunar引用包的数据</div>
      </td>
      <td class="last">{{ solarlunarDate }}</td>
    </tr>
  </table>
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
      showDateArray: [],
      calendarDate: new Date(),
      weekName: ['日', '一', '二', '三', '四', '五', '六'],
      solarYearMonth: '',
      solarlunarDate: {},
      solarlunar20221008: {}
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

    this.showCalendar(this.calendarDate)

    this.getSolarLunarDateData()
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
    getSolarLunarDateData() {
      // 原来new Date()中参数还可以写成逗号分隔的形式，并且数字和字符都行，数字为0或负数都可以，早知道之前的逻辑就不拼接字符串和前缀了；
      // 但是已经写了，不想再大规模改了，就这样吧，以后有新功能再逗号分隔着用
      console.log(new Date(2022, -1, -1), '-------------2022, -1, -1')
      console.log(new Date(2022, 0, 0), '-------------2022, 0, 0')
      console.log(new Date(2022, 1, 1), '-------------2022, 1, 1')
      console.log(new Date(2022, 12, 1), '-------------2022, 12, 1')
      console.log(new Date(2022, 12, 32), '-------------2022, 12, 32')
      this.solarlunarDate = solarlunar
      this.solarlunar20221008 = solarlunar.solar2lunar(2022, 10, 8);
    },

    // 切换到上一个月，这里写成逗号分隔的形式可以直接month-1，原来不知道可以这样写
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
      this.showDateArray = []
      this.showCalendar(this.calendarDate)
    },

    // 切换到下一个月，这里写成逗号分隔的形式可以直接month+1，原来不知道可以这样写
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
      this.showDateArray = []
      this.showCalendar(this.calendarDate)
    },

    // 展示日历方法2，和方法1比有些不一样，但我仍然保留，可以参考，后续有些设置当天和初一这里没做了，都一样
    showCalendar2(date) {
      const year = date.getFullYear()
      const month = this.padZero(date.getMonth() + 1)
      this.solarYearMonth = year + '年' + month + '月'

      // 对当月第一天前的日期都置为空
      const monthFirstDayWeek = new Date(year + '-' + month + '-01').getDay()
      for (let i = -monthFirstDayWeek; i < 0; i++) {
        this.showDateArray.push('')
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

        this.showDateArray.push(showDate)
        showDate = {}
      }
      console.log(this.showDateArray)
    },

    showCalendar(date) {
      const year = date.getFullYear()
      const month = this.padZero(date.getMonth() + 1)
      this.solarYearMonth = year + '年' + month + '月'

      // 对当月第一天前的日期都置为空，这里因为solarlunar.solar2lunar方法得到的nWeek星期天数字为7，故要重置为0
      let monthFirstDayWeek = solarlunar.solar2lunar(year, month, this.padZero(1)).nWeek
      monthFirstDayWeek = monthFirstDayWeek === 7 ? 0 : monthFirstDayWeek
      for (let i = -monthFirstDayWeek; i < 0; i++) {
        this.showDateArray.push('')
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
          showDate.isToday = true
        }
        this.showDateArray.push(showDate)
        showDate = {}
      }
      // 使用下面这种做法就不需要在上面for循环中使用if，从而只需要判断一次，
      // 但代码不够简洁，而for循环的量也不大，性能提高不明显，故不用，仅做参考
      // const todayIndex = new Date().getDate() + monthFirstDayWeek - 1
      // if (todayIndex <= this.showDateArray.length - 1) {
      //   const today = this.showDateArray[todayIndex]
      //   if (today.year === year && today.month === month) {
      //     today.isToday = true
      //   }
      // }
      console.log(this.showDateArray)
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
  font-size: 28px;
}

.toggleMonth:hover {
  cursor: pointer;
  color: blue;
}

.fa-angle-down {
  padding: 0 19px 0 40px;
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
  width: 56px;
  padding: 10px 0;
  border: 1px double transparent;
}

.weekDay2:hover {
  cursor: pointer;
  background-color: lightblue;
  border: 1px double black;
}

.calendar {
  width: 408px;
  background-color: whitesmoke;
  margin: 0 auto;
}

.isToday {
  color: #f00;
  background-color: lightgreen;
}

.isLunarFirstDay {
  border-bottom: 1px solid blue;
}

.lunarDay {
  font-size: 14px;
}

table {
  margin: 0 20px 20px 20px;
}

table tr td {
  border-top: 2px solid black;
  border-left: 2px solid black;
}

.last {
  border-bottom: 2px solid black;
}

.name {
  color: red;
  text-align: center;
}

.description {
  color: blue;
  text-align: center;
}

table tr td:last-child {
  width: 78%;
  border-right: 2px solid black;
}

a {
  text-decoration: none;
}
</style>