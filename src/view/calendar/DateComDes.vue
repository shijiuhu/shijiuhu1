<template>
  <div>
    <table class="common dayjs">
      <tr>
        <td colspan="2" class="title">dayjs依赖的一些说明</td>
      </tr>
      <tr>
        <td class="name">打印属性</td>
        <td>
              $y: 2022
          <br>$M: 8
          <br>$D: 24
          <br>$H: 14
          <br>$m: 55
          <br>$s: 3
          <br>$ms: 806
          <br>$W: 6
          <br>
          <br>$L: "en"
          <br>$d: Sat Sep 24 2022 14:55:03 GMT+0800 (中国标准时间) {}
                  (这个属性得到的是Date，可以使用getFullYear()等方法继续得到值)
          <br>$x: {}
        </td>
      </tr>
      <tr>
        <td class="last">
          <div class="name">打印方法</div>
          <div class="description">(很多方法和属性得到的值是一样的，都可以使用)</div>
        </td>
        <td class="last">
              year: ƒ (e)
          <br>month: ƒ (e)
          <br>date: ƒ (e)
          <br>hour: ƒ (e)
          <br>minute: ƒ (e)
          <br>second: ƒ (e)
          <br>millisecond: ƒ (e)
          <br>day: ƒ (e)
          <br>
          <br>$g: ƒ (t, e, n)
          <br>$locale: ƒ ()
          <br>$set: ƒ (t, e)
          <br>$utils: ƒ ()
          <br>add: ƒ (r, h)
          <br>clone: ƒ ()
          <br>daysInMonth: ƒ ()
          <br>diff: ƒ (r, d, $)
          <br>endOf: ƒ (t)
          <br>format: ƒ (t)
          <br>get: ƒ (t)
          <br>init: ƒ ()
          <br>isAfter: ƒ (t, e)
          <br>isBefore: ƒ (t, e)
          <br>isSame: ƒ (t, e)
          <br>isValid: ƒ ()
          <br>locale: ƒ (t, e)
          <br>parse: ƒ (t)
          <br>set: ƒ (t, e)
          <br>startOf: ƒ (t, e)
          <br>subtract: ƒ (t, e)
          <br>toDate: ƒ ()
          <br>toISOString: ƒ ()
          <br>toJSON: ƒ ()
          <br>toString: ƒ ()
          <br>unix: ƒ ()
          <br>utcOffset: ƒ ()
          <br>valueOf: ƒ ()
        </td>
      </tr>
    </table>

    <table class="common">
      <tr>
        <td colspan="2" class="title">solarlunar依赖的属性和方法说明</td>
      </tr>
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
  </div>
</template>

<script>
import solarlunar from 'solarlunar'
import dayjs from 'dayjs'

export default {
  name: 'DateComDes',
  data() {
    return {
      solarlunarDate: {},
      solarlunar20221008: {},
      dayjs: {},
    }
  },
  created() {
    this.getSolarLunarDateData()
    this.getDayjs()
  },
  methods: {
    getDayjs() {
      this.dayjs = dayjs()
      console.log(this.dayjs, '-----------dayjs()')

      console.log(this.dayjs.year(), '-----------dayjs().year()')
      console.log(this.dayjs.month(), '-----------dayjs().month()')
      console.log(this.dayjs.date(), '-----------dayjs().date()')
      console.log(this.dayjs.hour(), '-----------dayjs().hour()')
      console.log(this.dayjs.minute(), '-----------dayjs().minute()')
      console.log(this.dayjs.second(), '-----------dayjs().second()')
      console.log(this.dayjs.millisecond(), '-----------dayjs().millisecond()')
      console.log(this.dayjs.day(), '-----------dayjs().day()')

      console.log(this.dayjs.$y, '-----------dayjs().$y')
      console.log(this.dayjs.$M, '-----------dayjs().$M')
      console.log(this.dayjs.$D, '-----------dayjs().$D')
      console.log(this.dayjs.$H, '-----------dayjs().$H')
      console.log(this.dayjs.$m, '-----------dayjs().$m')
      console.log(this.dayjs.$s, '-----------dayjs().$s')
      console.log(this.dayjs.$ms, '-----------dayjs().$ms')
      console.log(this.dayjs.$W, '-----------dayjs().$W')
    },

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
  }
}
</script>

<style scoped>
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

.title {
  text-align: center;
  height: 50px;
  font-size: 30px;
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

.common {
  width: 96%;
}
</style>